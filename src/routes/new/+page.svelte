<script lang="ts">
	import { backend, type Components } from '$lib';
	import { DateTime } from 'luxon';
	import { type AxiosError } from 'openapi-client-axios';

	let videoUrl = '';

	async function fetchVideo(videoId: string) {
		if (form.fetching || videoId === '') {
			return;
		}

		try {
			form.fetching = true;
			const response = await backend.getVideoInfo({ videoId: [videoId] });
			video = response.data[0];
			form.error = null;
		} catch (e) {
			const axiosError = e as AxiosError;

			const status = axiosError.response?.status;
			const response = axiosError.response?.data as any;

			if (status === 400) {
				form.error = `Cannot find video: '${videoId}'`;
			} else {
				form.error = response.message ?? 'An error occurred';
			}
		} finally {
			form.fetching = false;
		}
	}

	let form = {
		fetching: false,
		error: null as string | null,
		endDate: false
	};

	let video: Partial<Components.Schemas.VideoInfo> = {};

	$: publishedDate = video?.publishDate ? DateTime.fromISO(video.publishDate).toFormat(`yyyy-MM-dd'T'HH:mm`) : null;
</script>

<main>
	<form method="POST" action="/new" class:fetching={form.fetching}>
		<div class="input">
			<label for="video">Video</label>
			<input
				type="text"
				id="video"
				name="video"
				placeholder="https://youtu.be/pkGvRvyEItM"
				required
				bind:value={videoUrl}
				on:change={() => fetchVideo(videoUrl)}

				on:submit|preventDefault|stopPropagation
			/>
		</div>

		<div class="input">
			<label for="title">Name</label>
			<input type="text" id="title" name="title" value={video.title ?? ''} disabled />
		</div>

		<div>
			<span>Has End Date?</span>

			<label>
				<input type="radio" name="has-end-date" value={false} bind:group={form.endDate} />
				No
			</label>

			<label>
				<input type="radio" name="has-end-date" value={true} bind:group={form.endDate} />
				Yes
			</label>
		</div>

		<div class="input">
			<label for="start-date">From</label>
			<input
				type="datetime-local"
				name="start-date"
				id="start-date"
				value={publishedDate}
				required
			/>
		</div>

		{#if form.endDate}
			<div class="input">
				<label for="end-date">To</label>
				<input
					type="datetime-local"
					name="end-date"
					id="end-date"
					required
					disabled={!form.endDate}
				/>
			</div>
		{/if}

		{#if form.error}
			<p class="error">{form.error}</p>
		{/if}

		<button type="submit">Add Video</button>
	</form>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;

		--highlight-color: hsl(209, 70%, 62%);
		--background-color: hsl(0, 0%, 70%);
		--focused-color: hsl(0, 0%, 10%);
	}

	label {
		display: inline-block;
		color: var(--focused-color);

		transition: 0.3s color ease;
	}

	input {
		width: 100%;

		padding: 3px;
		border: none;
		background: none;

		border-bottom: 1px solid var(--background-color);
		outline: none;

		transition: 0.3s border-color ease;

		&:focus {
			border-color: var(--highlight-color);
		}
	}

	input[type='radio'] {
		width: min-content;
		display: inline-block;
	}

	div.input {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto;
		grid-template-areas: 'label label' 'input input';

		& label {
			grid-area: label;
		}

		& input {
			grid-area: input;
		}
	}

	div.input:has(input:focus) label {
		color: var(--focused-color);
		font-weight: bold;
	}
	div.input:has(input:required) {
		grid-template-areas: 'label label' 'marker input';

		&::after {
			content: '*';
			color: red;
			grid-area: marker;
			display: inline-block;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 15px;

		margin: 25px;

		width: clamp(50%, 400px, 600px);
	}

	form.fetching {
		& input {
			opacity: 0.5;
		}
	}

	.error {

		--highlight-color: hsl(0, 77%, 62%);
		--text-color: var(--highlight-color);

		padding: 5px 10px;
		border-radius: 0px 5px 5px 0px;
		border-left: 4px var(--highlight-color) solid;

		background-color: rgb(from var(--highlight-color) r g b / calc(alpha - 0.9));
		color: var(--text-color);

		text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
	}

	button {
		width: fit-content;
		padding: 5px 10px;

		
		border: 1px solid var(--background-color);
		border-radius: 5px;

		align-self: center;

		&:hover {
			cursor: pointer;
		}
	}
</style>
