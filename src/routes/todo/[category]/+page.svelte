<script lang="ts">
	import { browser } from '$app/environment';
	if (browser) {
		const socket = new WebSocket('ws://localhost:5173/websocket');
		socket.addEventListener('open', () => {
			console.log('listening on wss');
		});
	}

	export let data;
</script>

<h1>Hello world this is Catgeory {data.category}</h1>
