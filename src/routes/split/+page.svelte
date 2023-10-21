<script lang="ts">
	import { El } from 'yesvelte';
	export let data;
</script>

<El tag="h1">Links to existing categories</El>
<ol>
	{#each data.links as link}
		<El tag="li">
			<a href={`split/${link}`}>{link}</a>
		</El>
	{/each}
</ol>
