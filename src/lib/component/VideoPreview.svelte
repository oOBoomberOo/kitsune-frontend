<script lang="ts">
	import type { Components } from '$lib/backend';

	export let data: Components.Schemas.VideoResponse;
</script>

<a href="/video/{data.id}">
	<header class:panic={data.status === 'PANIC'}>
		<img src="https://img.youtube.com/vi/{data.id}/maxresdefault.jpg" alt={data.title} />

		<span>{data.title}</span>
	</header>
</a>

<style>
	a {
		color: inherit;
		text-decoration: none;
        display: block;
	}

    .panic {
        border: 1px solid red;
    }

	header {
		display: grid;
		font-weight: normal;
		gap: 5px;

		border-radius: 5px;

		box-shadow: rgba(0, 0, 0, 0.25) 5px 5px 1px;
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
