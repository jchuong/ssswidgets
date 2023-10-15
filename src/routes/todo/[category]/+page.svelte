<script lang="ts">
	import { browser } from '$app/environment';
	import { Checkbox } from 'yesvelte';
    import type { TodoItem } from '$types'

	let checkboxes: TodoItem[] = [];
	if (browser) {
		const socket = new WebSocket('ws://localhost:5173/websocket');
		socket.addEventListener('open', () => {
			console.log('listening on wss');
		});

		socket.addEventListener('message', (event) => {
			console.log('received message', event.data);
			try {
				const payload = JSON.parse(event.data);
				if (payload.type !== 'TODO') {
					return;
				}
				checkboxes = payload.checkboxes;
			} catch (err) {
				console.error(err);
			}
		});
	}

	function handleCheckboxChange(item: TodoItem) {
		console.log(`Checkbox for ${item.label} toggled. Checked: ${item.checked}`);
	}

	export let data;
</script>

<h1>Hello world this is Catgeory {data.category}</h1>

<div>
	{#each checkboxes as item (item.label)}
		<Checkbox
			bind:checked={item.checked}
			label={item.label}
			on:change={() => handleCheckboxChange(item)}
		/>
	{/each}
</div>
