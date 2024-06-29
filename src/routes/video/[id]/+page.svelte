<script lang="ts">
	import { DateTime } from 'luxon';
	import { groupby, map } from 'itertools';

	import type { PageData } from './$types';
	import type { Components } from '$lib/backend';

	import { page as _page } from '$app/stores';
	import { withQuery } from '$lib/helper';
	import RecordChart from '$lib/component/RecordChart.svelte';
	import { backend } from '$lib';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	const format = `yyyy-MM-dd HH:mm`;

	$: video = data.video;

	function datetime(s: string) {
		const date = DateTime.fromISO(s);

		if (!date.isValid) {
			return null;
		}

		return date.toFormat(format);
	}

	$: createdAt = datetime(video.addedAt);
	$: startAt = datetime(video.startAt);
	$: endAt = datetime(video.endAt);

	let videoColor = 'color-running';
	$: {
		switch (video.status) {
			case 'PANIC':
				videoColor = 'color-warning';
				break;
			case 'COMPLETED':
				videoColor = 'color-completed';
				break;
			case 'SCHEDULED':
				videoColor = 'color-scheduled';
				break;
			default:
				videoColor = 'color-running';
		}
	}

	function groupRecordByDate(records: Components.Schemas.RecordResponse[]) {
		const mapped = map(records, (record) => {
			const datetime = DateTime.fromISO(record.createdAt);

			const date = datetime.toFormat(`yyyy-MM-dd HH'H'00`);
			const time = datetime.toFormat('HH:mm');

			return { date, time, ...record };
		});

		const grouped = groupby(mapped, (record) => record.date);

		return map(grouped, ([name, group]) => [name, [...group]] as const);
	}

	$: records = data.records.content;
	$: recordGroups = groupRecordByDate(records);

	let params = {
		page: 1,
		pageSize: 100,
		interval: 1
	};

	$: isFirst = params.page <= 1;
	$: isLast = params.page >= maxPages;
	$: maxPages = data.records.page.totalPages;

	$: params.page = Math.max(Math.min(params.page, maxPages), 1);

	const searchParams = $_page.url.searchParams;
	$: withQuery(searchParams, params, { replaceState: true });

	async function restartVideo(videoId: string) {
		try {
			await backend.restartVideo({ videoId: [videoId] });
			await invalidateAll();
		} catch (e) {
			console.error(e);
		}
	}
</script>

<article>
	<section class="record-list card">
		<nav class="paginator">
			<div class="page-filter">
				<button on:click={() => (params.page = 1)} disabled={isFirst}>First</button>

				<button on:click={() => params.page--} disabled={isFirst}>Prev</button>

				<span class="page-selector">
					<input
						type="number"
						name="page"
						id="page"
						bind:value={params.page}
						min="1"
						max={maxPages}
					/>
					/
					<span>{maxPages}</span>
				</span>

				<button on:click={() => params.page++} disabled={isLast}>Next</button>

				<button on:click={() => (params.page = maxPages)} disabled={isLast}>Last</button>
			</div>

			<div class="size-filter">
				<label for="size">Page Size</label>
				<select name="size" id="size" bind:value={params.pageSize}>
					<option value={1}>1</option>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
					<option value={0x7fffffff}>ALL</option>
				</select>
			</div>

			<div class="interval-filter">
				<label for="interval">Interval</label>
				<select name="interval" id="interval" bind:value={params.interval}>
					<option value={1}>1m</option>
					<option value={5}>5m</option>
					<option value={10}>10m</option>
					<option value={15}>15m</option>
					<option value={30}>30m</option>
					<option value={60}>1h</option>
				</select>
			</div>
		</nav>

		<div class="container">
			{#each recordGroups as [date, group] (date)}
				<div class="group">
					<div class="date">
						<time datetime={date}>{date}</time>
					</div>

					<div class="content">
						{#each group as record (record.id)}
							<div class="record">
								<span class="time">{record.time}</span>
								<span class="views">{record.views}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="video-info card">
		<header style="flex-shrink: 1">
			<a href="https://youtu.be/{video.id}">
				<img src="https://img.youtube.com/vi/{video.id}/maxresdefault.jpg" alt="Video Thumbnail" />
			</a>
		</header>

		<div class="container">
			<section class="title"><a href="https://youtu.be/{video.id}">{video.title}</a></section>

			<section class="status {videoColor}">
				<span class="badge">{video.status}</span>

				{#if video.status === 'SCHEDULED'}
					<p class="quoted-box">
						<span>Tracker has been scheduled but not yet active</span>
					</p>
				{:else if video.status === 'ACTIVE'}
					<p class="quoted-box">
						<span>Tracker is running</span>
					</p>
				{:else if video.status === 'COMPLETED'}
					<p class="quoted-box">
						<span>Tracker has completed its task</span>
					</p>
				{:else if video.status === 'PANIC'}
					<p class="quoted-box">
						<span>{video.panicMessage}</span>

						<br /><br />

						<button on:click={() => restartVideo(video.id)} class="restart-btn" type="button"
							>Try restart?</button
						>
					</p>
				{/if}
			</section>

			{#if startAt && endAt}
				<section class="tracking-info">
					<p>
						start from <time datetime={video.addedAt}>{startAt}</time> to
						<time datetime={video.endAt}>{endAt}</time>
					</p>
				</section>
			{:else if startAt}
				<section class="tracking-info">
					<p>start from <time datetime={video.addedAt}>{startAt}</time></p>
				</section>
			{:else if endAt}
				<section class="tracking-info">
					<p>Until <time datetime={video.endAt}>{endAt}</time></p>
				</section>
			{/if}

			<footer>
				<p class="created-at">
					created at <time class="created-at" datetime={video.addedAt}>{createdAt}</time>
				</p>
			</footer>
		</div>
	</section>

	<section class="graph card">
		<RecordChart {records} />
	</section>
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-rows: auto auto;
		gap: 20px;

		min-height: 0;
		min-width: 0;

		height: 100%;
	}

	.card {
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.record-list {
		position: relative;
		grid-column: 1 / 2;
		grid-row: 1 / 3;
		min-height: 0;
		min-width: 0;

		display: flex;
		flex-direction: column;

		& .container {
			height: 100%;

			position: relative;
			display: flex;
			flex-direction: column;
			gap: 0px;
			overflow-y: auto;

			font-family: monospace;
		}

		& .group {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: inherit;

			font-size: 14px;
			color: hsl(0, 0%, 50%);

			& .date {
				position: sticky;
				top: 0;
				bottom: 0;
				background-color: hsla(0, 0%, 95%, 1);

				padding: 5px 15px;
				font-size: 1.15em;
				font-weight: bold;

				text-align: right;
				padding-right: 100px;
			}
		}

		& .content {
			display: flex;
			flex-direction: column;
		}

		& .record {
			display: grid;
			grid-template-columns: auto 100px;

			padding: 5px 10px;
			border-radius: 0px;
			border-bottom: 1px solid hsl(0, 0%, 95%);

			&:hover {
				background-color: hsl(213, 77%, 95%);
			}

			& .time {
				text-align: right;
			}

			& .views {
				text-align: right;
				font-weight: bold;
			}
		}
	}

	.video-info {
		grid-column: 2 / 3;
		grid-row: 1 / 2;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 250px 1fr;

		& header {
			height: 100%;
			max-height: 100%;
		}

		& img {
			height: 100%;
			width: 100%;
			border-radius: 5px;
			object-fit: cover;
		}

		& p {
			margin: 0;
		}

		& .container {
			padding: 10px;

			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		& .title {
			font-size: 14px;
			text-wrap: pretty;

			& a {
				text-decoration: none;
				color: inherit;
				font-weight: bold;
				transition: 0.1s color ease-in-out;
			}

			& a:hover {
				color: hsl(207, 77%, 62%);
				text-decoration: underline;
			}
		}

		& .created-at {
			font-size: 12px;
			color: hsl(0, 0%, 50%);
			text-align: right;
		}
	}

	.tracking-info {
		font-size: 14px;
		color: hsl(0, 0%, 40%);

		& time {
			color: white;
			background-color: hsl(0, 0%, 50%);
			border-radius: 3px;
			padding: 1px 5px;
		}
	}

	.graph {
		grid-column: 2 / 3;
		grid-row: 2 / 3;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.color-running {
		--highlight-color: hsl(204, 77%, 62%);
	}

	.color-warning {
		--highlight-color: hsl(0, 77%, 62%);
	}

	.color-completed {
		--highlight-color: hsl(120, 77%, 62%);
	}

	.color-scheduled {
		--highlight-color: hsl(263, 77%, 62%);
	}

	.badge {
		display: inline-block;
		padding: 3px 10px;
		border-radius: 15px;
		color: hsl(0, 100%, 100%);
		text-transform: uppercase;
		background: var(--highlight-color);
	}

	.status {
		display: grid;

		grid-template-columns: auto 1fr;
		gap: 5px;

		justify-content: start;
		align-items: first baseline;
		font-size: 13px;
	}

	.quoted-box {
		--text-color: var(--highlight-color);

		padding: 5px 10px;
		border-radius: 0px 5px 5px 0px;
		border-left: 4px var(--highlight-color) solid;

		background-color: rgb(from var(--highlight-color) r g b / calc(alpha - 0.8));
		color: var(--text-color);

		text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
	}

	.restart-btn {
		display: block;

		padding: 5px 10px;
		color: white;
		border: 1px var(--text-color) solid;
		border-radius: 5px;
		background-color: var(--highlight-color);

		box-shadow: 0px 5px 0px rgba(0, 0, 0, 0.25);
		transform: translateY(-5px);
		transition:
			0.1s transform,
			0.1s box-shadow;

		&:hover {
			cursor: pointer;
			background-color: rgb(255, 0, 0);
			transform: translateY(0px);
			box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
		}
	}

	.paginator {
		margin-left: auto;
		margin-right: auto;

		display: flex;
		justify-content: center;
		align-items: center;
		color: hsl(0, 0%, 50%);
		gap: 15px;

		padding: 10px;

		position: sticky;
		top: 0;
		bottom: 0;

		& .page-selector {
			display: flex;
			gap: 3px;
			justify-content: center;
			align-items: center;

			& input {
				min-width: 1ch;

				outline: none;
				border: none;
				border-bottom: 1px solid hsl(0, 0%, 40%);
			}
		}
	}

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
	}
</style>
