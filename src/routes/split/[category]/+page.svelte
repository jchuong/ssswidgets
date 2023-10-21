<script lang="ts">
	import { Dot, El, Table, TableHead, TableRow, TableCell, TableBody, TableFoot } from 'yesvelte';
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

	let activeRow = splits.findIndex((split) => split.active);
</script>

<Table border>
	<TableHead>
		<TableRow>
			<TableCell />
			{#if useTime}<TableCell>Time</TableCell> {/if}
			{#if useAttempts}<TableCell>Attempts</TableCell>{/if}
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
				{#if useAttempts}<TableCell>{split.attempts}</TableCell>{/if}
			</TableRow>
		{/each}
	</TableBody>
	<TableFoot>
		<TableRow color="primary">
			<TableCell>Total</TableCell>
			{#if useTime}<TableCell>{summary.totalTime}</TableCell>{/if}
			{#if useAttempts}<TableCell>{summary.totalAttempts}</TableCell>{/if}
		</TableRow>
	</TableFoot>
</Table>
