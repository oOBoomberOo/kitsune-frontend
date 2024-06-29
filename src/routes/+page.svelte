<script lang="ts">
	import type { PageData } from './$types';

	import { fly } from 'svelte/transition';
	import VideoPreview from '$lib/component/VideoPreview.svelte';
	import Paginator from '$lib/component/Paginator.svelte';
	export let data: PageData;

	let page = 1;
	let pageSize = 10;

	$: content = data.videos.content!;

</script>

<div class="pagination">
	<select bind:value={pageSize} name="pageSize" id="pageSize">
		<option value={1}>1</option>
		<option value={10} selected>10</option>
		<option value={25}>25</option>
		<option value={50}>50</option>
		<option value={100}>100</option>
	</select>

	<Paginator data={data.videos.page} bind:page />
</div>

<div class="container">
	{#each content as video, index}
		<div in:fly={{ duration: 100 * index, x: 500 }}>
			<VideoPreview data={video} />
		</div>
	{/each}
</div>

<style>
    .pagination {
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    .container {
        display: grid;

        margin: 15px;

        justify-content: center;

        grid-template-columns: repeat(auto-fill, 200px);
        gap: 15px;
    }
</style>
