<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Card, CardBody, CardFooter, El, Icon } from 'yesvelte';
</script>

<El tag="h1">Welcome to SSSWidgets</El>

<El container>
	<El row="deck">
		<El col>
			<Card title="Todo"
				><CardBody>
					Simple todo checkbox list, control the checkboxes on a browser and display them in OBS.
				</CardBody>
				<CardFooter>
					<Button color="primary" on:click={() => goto('todo')}
						><Icon name="arrow-badge-right-filled" />Go</Button
					>
				</CardFooter>
			</Card>
		</El>
		<El col>
			<Card title="Placeholder"><CardBody>Placeholder</CardBody></Card>
		</El>
	</El>
</El>
