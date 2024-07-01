<script lang="ts">
	import type { Components } from '$lib/backend';

	export let page: number;
	export let maxPage: number;

	$: isFirst = page <= 1;
	$: isLast = page >= maxPage;
</script>

<div class="page-filter">
	<button on:click={() => (page = 1)} disabled={isFirst}>First</button>

	<button on:click={() => page--} disabled={isFirst}>Prev</button>

	<span class="page-selector">
		<input type="number" name="page" id="page" bind:value={page} min="1" max={maxPage} />
		/
		<span>{maxPage}</span>
	</span>

	<button on:click={() => page++} disabled={isLast}>Next</button>

	<button on:click={() => (page = maxPage)} disabled={isLast}>Last</button>
</div>

<style>
	.page-filter {
		display: flex;
		justify-content: center;
		color: hsl(0, 0%, 50%);

		& button {
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

			&:disabled {
				cursor: not-allowed;
				background-color: hsl(0, 0%, 95%);
			}
		}

		& .page-selector {
			display: flex;
			gap: 3px;
			justify-content: center;
			align-items: center;

			& input {
				min-width: 1ch;
				width: 6ch;

				outline: none;
				border: none;
				border-bottom: 1px solid hsl(0, 0%, 40%);
				text-align: right;
			}
		}
	}
</style>
