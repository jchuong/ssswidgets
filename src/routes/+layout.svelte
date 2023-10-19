<script>
	import tabler from 'yesvelte/css/tabler.min.css?url';
	import { El } from 'yesvelte';
</script>

<svelte:head>
	<link rel="stylesheet" href={tabler} />
</svelte:head>

<El container="lg" p="1">
	<slot />
</El>
