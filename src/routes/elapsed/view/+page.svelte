<script lang="ts">
	import { Alert, El } from 'yesvelte';
	import { browser } from '$app/environment';
	import type { WebSocketError, WebSocketMessage, WebSocketElapsed } from '$types';

	let socket: WebSocket;
	let error: string;
	let milliseconds: number = 0;
	if (browser) {
		socket = new WebSocket('ws://localhost:5173/websocket');
		socket.addEventListener('open', () => {
			console.log('Elapsed view ready');
		});

		socket.addEventListener('message', (event) => {
			try {
				const message: WebSocketMessage = JSON.parse(event.data);
				if (message.type !== 'ELAPSED') {
					// Message was not for this client
					return;
				} else if (message.action === 'ERROR') {
					error = (message as WebSocketError).payload;
				} else {
					milliseconds = (message as WebSocketElapsed).payload;
				}
			} catch (err) {
				console.error(err);
			}
		});
	}

	function formatTime(milliseconds: number) {
		return new Date(milliseconds).toISOString().substr(11, 8);
	}
</script>

<El tag="p" fontSize="1">
	{formatTime(milliseconds)}
</El>
{#if error}
	<Alert color="danger">{error}</Alert>
{/if}
