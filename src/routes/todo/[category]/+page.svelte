<script lang="ts">
	import { browser } from '$app/environment';
	import { Alert, Checkbox, El, Spinner } from 'yesvelte';
	import type { TodoItem, WebSocketError, WebSocketMessage, WebSocketTodo } from '$types';

	export let data;

	let socket: WebSocket;
	let error: string;
	let checkboxes: Array<TodoItem> = [];
	if (browser) {
		socket = new WebSocket('ws://localhost:5173/websocket');
		socket.addEventListener('open', () => {
			// Fetch file content, but maybe it can be a page.server function
			const message: WebSocketTodo = {
				type: 'TODO',
				action: 'READ',
				category: data.category,
				payload: []
			};
			socket.send(JSON.stringify(message));
		});

		socket.addEventListener('message', (event) => {
			try {
				const message: WebSocketMessage = JSON.parse(event.data);
				if (message.type !== 'TODO' || message.category !== data.category) {
					// Message was not for this client
					return;
				} else if (message.action === 'ERROR') {
					error = (message as WebSocketError).payload;
				} else {
					checkboxes = (message as WebSocketTodo).payload;
				}
			} catch (err) {
				console.error(err);
			}
		});
	}

	// Update the checkboxes, then send to server for all clients
	function handleChange(label: string) {
		checkboxes = checkboxes.map((item) =>
			item.label === label ? { ...item, checked: !item.checked } : item
		);
		if (socket) {
			const message: WebSocketTodo = {
				type: 'TODO',
				action: 'WRITE',
				category: data.category,
				payload: checkboxes
			};
			socket.send(JSON.stringify(message));
		}
	}
</script>

<El container="lg" p="1" m="2">
	{#if !error && checkboxes.length === 0}
		<Spinner color="primary" />
	{/if}
	{#each checkboxes as item (item.label)}
		<Checkbox
			checked={item.checked}
			label={item.label}
			on:change={() => handleChange(item.label)}
		/>
	{/each}
	{#if error}
		<Alert important icon="alert-triangle" color="warning">
			{error}
		</Alert>
	{/if}
</El>
