<script lang="ts">
	import {
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
	let { useAttempts, useTime, splits } = data.config;

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
	$: elapsedTime = splits[activeRow].time || 0;
	$: currentAttempts = splits[activeRow].attempts || 0;

	function decreaseAttempts() {
		if (splits[activeRow].attempts > 0) {
			splits[activeRow].attempts -= 1;
		}
	}

	function increaseAttempts() {
		splits[activeRow].attempts += 1;
	}

	function nextSplit() {
		splits[activeRow].active = false;
		if (activeRow < splits.length) {
			splits[activeRow + 1].active = true;
		}
	}
</script>

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
				{#if useTime}<TableCell>{split.time}</TableCell> {/if}
				{#if useAttempts}<TableCell
						><El tag="span" me="2">{split.attempts}</El>
						{#if split.active}<ButtonGroup
								><Button color="danger" on:click={decreaseAttempts} disabled={currentAttempts === 0}
									><Icon name="minus" /></Button
								><Button color="primary" on:click={increaseAttempts}><Icon name="plus" /></Button
								></ButtonGroup
							>
						{/if}
					</TableCell>{/if}
				<TableCell>
					{#if split.active}<Button color="primary" on:click={nextSplit}>Next</Button>{/if}
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
	<TableFoot>
		<TableRow color="primary">
			<TableCell>Total</TableCell>
			{#if useTime}<TableCell>{summary.totalTime}</TableCell>{/if}
			{#if useAttempts}<TableCell>{summary.totalAttempts}</TableCell>{/if}
			<TableCell />
		</TableRow>
	</TableFoot>
</Table>
