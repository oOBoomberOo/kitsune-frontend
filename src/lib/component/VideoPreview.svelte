<script lang="ts">
	import type { Components } from '$lib/backend';

	export let data: Components.Schemas.VideoResponse;

	$: stopped = data.status === 'COMPLETED';
</script>

<a href="/video/{data.id}" class:stopped={stopped} class:panic={data.status === 'PANIC'}>
	<header>
		<img src="https://img.youtube.com/vi/{data.id}/maxresdefault.jpg" alt={data.title} />

		<span>{data.title}</span>
	</header>
</a>

<style>
	a {
		color: inherit;
		text-decoration: none;
        display: block;

		--highlight-color: rgba(0, 0, 0, 0.25);
	}

	.stopped {
		filter: grayscale(100%);
	}

    .panic {
		--highlight-color: hsl(0, 77%, 80%) !important;
    }

	header {
		display: grid;
		font-weight: normal;
		gap: 5px;

		border-radius: 5px;

		box-shadow: var(--highlight-color) 5px 5px 1px;
		transition: 0.1s transform;
		

		&:hover {
			transform: translateY(-5px);
		}
	}

	span {
		font-size: 14px;
		overflow: hidden;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		padding: 5px;
	}

	img {
		width: 100%;
		aspect-ratio: 16 / 9;

		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
	}
</style>
