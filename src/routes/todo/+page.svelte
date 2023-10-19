<script lang="ts">
	import { El } from 'yesvelte';
	export let data;
</script>

<El container="lg" p="1" m="2">
	<El tag="h1">Links to existing categories</El>
	<ol>
		{#each data.links as link}
			<El tag="li">
				<a href={`todo/${link}`}>{link}</a>
			</El>
		{/each}
	</ol>
</El>
