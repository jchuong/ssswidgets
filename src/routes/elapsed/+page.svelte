<script lang="ts">
	import { browser } from '$app/environment';
	import type { WebSocketElapsed, WebSocketError, WebSocketMessage } from '$types';
	import { Button, El } from 'yesvelte';
	let startTime: number;
	let running = false;
	let elapsedTime = 0;
	let timerInterval: NodeJS.Timeout;
	let socket: WebSocket;

	if (browser) {
		socket = new WebSocket('ws://localhost:5173/websocket');
		socket.addEventListener('open', () => {
			console.log('Elapsed controller ready');
		});
	}

	function startTimer() {
		running = true;
		startTime = performance.now();
		timerInterval = setInterval(updateElapsedTime, 1000);
	}

	function pauseTimer() {
		// add partial time then pause
		running = false;
		const currentTime = performance.now();
		const diff = currentTime - startTime;
		elapsedTime += diff;
		clearInterval(timerInterval);
	}

	function resetTimer() {
		running = false;
		clearInterval(timerInterval);
		elapsedTime = 0;
		if (socket) {
			socket.send(
				JSON.stringify({
					type: 'ELAPSED',
					action: 'WRITE',
					category: '',
					payload: elapsedTime
				} as WebSocketElapsed)
			);
		}
	}

	function updateElapsedTime() {
		const currentTime = performance.now();
		const diff = currentTime - startTime;
		elapsedTime += diff;
		startTime = currentTime;
		if (socket) {
			socket.send(
				JSON.stringify({
					type: 'ELAPSED',
					action: 'WRITE',
					category: '',
					payload: elapsedTime
				} as WebSocketElapsed)
			);
		}
	}

	function formatTime(milliseconds: number) {
		return new Date(milliseconds).toISOString().substr(11, 8);
	}
</script>

<El tag="p" fontSize="1">
	Time elapsed:
	{formatTime(elapsedTime)}
</El>

<Button on:click={startTimer} disabled={running}>Start</Button>
<Button on:click={pauseTimer} disabled={!running}>Pause</Button>
<Button on:click={resetTimer} disabled={elapsedTime === 0}>Reset</Button>
