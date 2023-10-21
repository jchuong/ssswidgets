<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type {
		Split,
		WebSocketError,
		WebSocketMessage,
		WebSocketSplitRead,
		WebSocketSplitWrite
	} from '$types';
	import {
		Alert,
		Dot,
		El,
		Icon,
		Table,
		TableHead,
		TableRow,
		TableCell,
		TableBody,
		TableFoot,
		ButtonGroup,
		Button
	} from 'yesvelte';
	export let data;
	let error: string;
	let { useAttempts = false, useTime = false, splits = [] } = data.config;
	let running = false;
	let socket: WebSocket;
	let startTime: number;
	let timerInterval: ReturnType<typeof setInterval>;
	let readOnly = $page.url.searchParams.get('view') !== null;

	if (browser) {
		socket = new WebSocket('ws://localhost:5173/websocket');

		socket.addEventListener('open', () => {
			console.log('Split ready');
		});

		socket.addEventListener('message', (event) => {
			try {
				const message: WebSocketMessage = JSON.parse(event.data);
				if (message.type !== 'SPLIT' || message.category !== data.category) {
					// Message was not for this client
					return;
				} else if (message.action === 'ERROR') {
					error = (message as WebSocketError).payload;
				} else if (message.action === 'READ' && readOnly) {
					splits = (message as WebSocketSplitRead).payload;
				}
			} catch (err) {
				console.error(err);
			}
		});
	}

	$: summary = splits.reduce(
		(memo, split) => {
			memo.totalTime += split.time;
			memo.totalAttempts += split.attempts;
			return memo;
		},
		{ totalTime: 0, totalAttempts: 0 }
	);

	$: activeRow = Math.max(
		splits.findIndex((split) => split.active),
		0
	);

	$: currentAttempts = splits[activeRow].attempts || 0;

	function decreaseAttempts() {
		if (splits[activeRow].attempts > 0) {
			splits[activeRow].attempts -= 1;
		}
		sendUpdate(splits);
	}

	function increaseAttempts() {
		splits[activeRow].attempts += 1;
		sendUpdate(splits);
	}

	function nextSplit() {
		splits[activeRow].active = false;
		if (activeRow < splits.length - 1) {
			splits[activeRow + 1].active = true;
		}
		sendUpdate(splits);
	}

	function startTimer() {
		running = true;
		startTime = performance.now();
		// Just 1s since we are writing to disk now
		timerInterval = setInterval(updateElapsedTime, 1000);
	}

	function stopTimer() {
		// add partial time then pause
		running = false;
		const currentTime = performance.now();
		const diff = currentTime - startTime;
		splits[activeRow].time += diff;
		clearInterval(timerInterval);
		sendUpdate(splits);
	}

	function updateElapsedTime() {
		const currentTime = performance.now();
		const diff = currentTime - startTime;
		startTime = currentTime;
		splits[activeRow].time += diff;
		sendUpdate(splits);
	}

	function sendUpdate(newSplits: Array<Split>) {
		if (!socket) {
			return;
		}
		socket.send(
			JSON.stringify({
				action: 'WRITE',
				category: data.category,
				type: 'SPLIT',
				payload: newSplits
			} as WebSocketSplitWrite)
		);
	}

	function formatTime(milliseconds: number) {
		return new Date(milliseconds).toISOString().substr(11, 8);
	}
</script>

{#if error}
	<Alert color="danger">{error}</Alert>
{/if}
<Table border>
	<TableHead>
		<TableRow>
			<TableCell />
			{#if useTime}<TableCell>Time</TableCell> {/if}
			{#if useAttempts}<TableCell>Attempts</TableCell>{/if}
			<TableCell />
		</TableRow>
	</TableHead>
	<TableBody>
		{#each splits as split, index}
			<TableRow color={index < activeRow ? 'success' : undefined}>
				<TableCell>
					<El tag="span" me="2">{split.title}</El>
					{#if split.active}<Dot color="primary" />
					{/if}
				</TableCell>
				{#if useTime}<TableCell>
						<El tag="span" me="2">{formatTime(split.time)}</El>
						{#if split.active && !readOnly}<ButtonGroup
								><Button color="danger" on:click={stopTimer} disabled={!running}
									><Icon name="alarm-off" /></Button
								><Button color="primary" on:click={startTimer} disabled={running}
									><Icon name="alarm" /></Button
								></ButtonGroup
							>
						{/if}
					</TableCell>
				{/if}
				{#if useAttempts}<TableCell
						><El tag="span" me="2">{split.attempts}</El>
						{#if split.active && !readOnly}<ButtonGroup
								><Button color="danger" on:click={decreaseAttempts} disabled={currentAttempts === 0}
									><Icon name="minus" /></Button
								><Button color="primary" on:click={increaseAttempts}><Icon name="plus" /></Button
								></ButtonGroup
							>
						{/if}
					</TableCell>{/if}
				<TableCell>
					{#if split.active && !readOnly}<Button
							color="primary"
							on:click={nextSplit}
							disabled={running}>Next</Button
						>{/if}
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
	<TableFoot>
		<TableRow color="primary">
			<TableCell>Total</TableCell>
			{#if useTime}<TableCell>{formatTime(summary.totalTime)}</TableCell>{/if}
			{#if useAttempts}<TableCell>{summary.totalAttempts}</TableCell>{/if}
			<TableCell />
		</TableRow>
	</TableFoot>
</Table>
