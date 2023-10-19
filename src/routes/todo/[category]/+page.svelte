<script lang="ts">
	import { browser } from '$app/environment';
	import { Checkbox, El } from 'yesvelte';
	import type { TodoItem, WebSocketTodo } from '$types';

	export let data;

	let socket: WebSocket;
	let checkboxes: Array<TodoItem> = [];
	if (browser) {
		socket = new WebSocket('ws://localhost:5173/websocket');
		socket.addEventListener('open', () => {
			console.log('listening on wss');
			const message: WebSocketTodo = {
				type: 'TODO',
				action: 'READ',
				category: data.category,
				payload: []
			};
			socket.send(JSON.stringify(message));
		});

		socket.addEventListener('message', (event) => {
			console.log('received message', event.data);
			try {
				const message: WebSocketTodo = JSON.parse(event.data);
				if (message.type !== 'TODO' || message.category !== data.category) {
					// Message was not for this client
					return;
				}
				checkboxes = message.payload;
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

<h1>Hello world this is Catgeory {data.category}</h1>

<El container="lg" p="1" m="2">
	{#each checkboxes as item (item.label)}
		<Checkbox
			checked={item.checked}
			label={item.label}
			on:change={() => handleChange(item.label)}
		/>
	{/each}
</El>
