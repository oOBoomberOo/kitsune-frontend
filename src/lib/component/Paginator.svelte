<script lang="ts">
	import type { Components } from "$lib/backend";

	export let data: Components.Schemas.PageMetadata;

	export let page: number = 1;

	$: isFirst = page <= 1;
	$: isLast = page >= data.totalPages;

	$: page = Math.max(Math.min(page, data.totalPages ?? 1), 1);
</script>

<div>
	<button on:click={() => page = page - 1} disabled={isFirst}>Prev</button>

	<input class="page-input" type="number" bind:value={page} min={1} max={data.totalPages}>
	<span>/</span>
	<span>{data.totalPages}</span>

	<button on:click={() => page = page + 1} disabled={isLast}>Next</button>
</div>

<style>
    div {
        display: inline-block;
    }

    .page-input {
        min-width: 1ch;
        width: auto;
		text-align: right;
    }
</style>