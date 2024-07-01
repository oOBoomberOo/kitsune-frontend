<script lang="ts">
	import type { PageData } from './$types';

	import { fly } from 'svelte/transition';
	import VideoPreview from '$lib/component/VideoPreview.svelte';
	import Paginator from '$lib/component/Paginator.svelte';
	import { withQuery } from '$lib/helper';
	import { flip } from 'svelte/animate';
	import { quintInOut } from 'svelte/easing';
	export let data: PageData;

	let page = 1;
	let pageSize = 100;

	$: maxPage = data.videos.page.totalPages;
	$: content = data.videos.content;
	$: withQuery({ page, pageSize });
</script>

<nav>
	<a href="/">Home</a>

	<span class="separator"></span>

	<div class="pagination">
		<Paginator bind:page bind:maxPage />

		<div>
			<select bind:value={pageSize} name="pageSize" id="pageSize">
				<option value={1}>1</option>
				<option value={10}>10</option>
				<option value={25}>25</option>
				<option value={50}>50</option>
				<option value={100}>100</option>
				<option value={0x7fffffff}>ALL</option>
			</select>
		</div>
	</div>

	<span class="separator"></span>

	<a href="/new">Add Video</a>
</nav>

<div class="container">
	{#each content as video, index (video.id)}
		<div>
			<VideoPreview data={video} />
		</div>
	{/each}
</div>

<style>
	nav {
		position: sticky;
		top: 0;

		padding: 5px 15px;

		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		background: white;
		z-index: 10;

		display: flex;

		& a {
			text-decoration: none;
			color: #000;
			font-weight: bold;
		}

		& a:hover {
			color: #333;
			text-decoration: underline;
		}

		& .separator {
			flex-grow: 1;
		}
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;

		& select {
			padding: 5px 10px;
			border-radius: 5px;
			border: 1px solid hsl(0, 0%, 80%);
			background-color: white;
			color: hsl(0, 0%, 30%);
			margin: 0 5px;

			&:hover {
				cursor: pointer;
				background-color: hsl(0, 0%, 95%);
			}
		}
	}

	.container {
		display: grid;

		margin: 15px;

		justify-content: center;

		grid-template-columns: repeat(auto-fill, 200px);
		gap: 15px;
	}
</style>
