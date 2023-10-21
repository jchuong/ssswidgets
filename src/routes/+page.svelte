<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Card, CardActions, CardBody, CardFooter, El, Icon } from 'yesvelte';
</script>

<El tag="h1">Welcome to SSSWidgets</El>

<El container>
	<El row="deck">
		<El col>
			<Card title="Todo"
				><CardBody>
					Simple todo checkbox list, control the checkboxes on a browser and display them in OBS.
					The <El tag="code">data/todo</El> directory will contain your saved checklists.
				</CardBody>
				<CardFooter>
					<CardActions>
						<Button color="primary" on:click={() => goto('todo')}
							><Icon name="arrow-badge-right-filled" />Go</Button
						>
					</CardActions>
				</CardFooter>
			</Card>
		</El>
		<El col>
			<Card title="Elapsed"
				><CardBody>
					A little hh:mm:ss timer with second(ish) resolution. Control the time with <El tag="code"
						>/elapsed</El
					> and view it with <El tag="code">/elapsed/view</El> (OBS browser source). This does not write
					any state to the data directory.
				</CardBody>
				<CardFooter>
					<CardActions>
						<Button color="primary" on:click={() => goto('elapsed')}
							><Icon name="arrow-badge-right" />Go to controller</Button
						>
						<Button color="primary" on:click={() => goto('elapsed/view')}
							><Icon name="arrow-badge-right-filled" />Go to viewer</Button
						>
					</CardActions>
				</CardFooter>
			</Card>
		</El>
		<El col>
			<Card title="Split"
				><CardBody>
					A list with active row control, optionally have one or both time elapsed and attempt
					counts with a summary at the bottom. The <El tag="code">data/split</El> directory will contain
					your progress and configuration. Use <El tag="code">?view</El> in the url for OBS browser source:
					<El tag="code">localhost:5173/split/example?view</El>
				</CardBody>
				<CardFooter>
					<CardActions>
						<Button color="primary" on:click={() => goto('split')}
							><Icon name="arrow-badge-right-filled" />Go to split</Button
						>
					</CardActions>
				</CardFooter>
			</Card>
		</El>
	</El>
</El>
