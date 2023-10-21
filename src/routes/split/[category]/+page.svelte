<script lang="ts">
	import { Button, ButtonGroup, Table, TableHead, TableRow, TableCell, TableBody, TableFoot } from 'yesvelte';
</script>

<Table border>
	<TableHead>
		<TableRow>
			<TableCell />
			<TableCell>Time</TableCell>
			<TableCell>Attempts</TableCell>
			<TableCell />
		</TableRow>
	</TableHead>
	<TableBody>
		<TableRow color="">
			<TableCell>Lady Butterfly</TableCell>
			<TableCell>10:00 <ButtonGroup><Button>+</Button><Button>-</Button></ButtonGroup></TableCell>
			<TableCell>13</TableCell>
			<TableCell>
				<ButtonGroup>
					<Button>+</Button>
					<Button>Done</Button>
				</ButtonGroup>
			</TableCell>
		</TableRow>
	</TableBody>
    <TableFoot>
		<TableRow>
			<TableCell>Lady Butterfly</TableCell>
			<TableCell>10:00</TableCell>
			<TableCell>13</TableCell>
		</TableRow>
    </TableFoot>
</Table>
