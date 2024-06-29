<script lang="ts">
	import type { Components } from '$lib/backend';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	import { Chart, type ChartData } from 'chart.js/auto';
	import 'chartjs-adapter-luxon';

	export let records: Components.Schemas.RecordResponse[];

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	function computeDataSets(data: Components.Schemas.RecordResponse[]) {
		const sorted = data
			.map((record) => {
				const timestamp = DateTime.fromISO(record.createdAt);
				return { y: record.views, x: timestamp.valueOf() };
			})
			.sort((a, b) => a.x.valueOf() - b.x.valueOf());

		return {

			datasets: [
				{
					label: "Views",
					data: sorted,
				}
			]
		} satisfies ChartData<'line'>;
	}

	$: {
		if (chart) {
			chart.data = computeDataSets(records);
			console.log(chart.data);
			chart.update();
		}
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw new Error('2d context not supported');
		}

		chart = new Chart(ctx, {
			type: 'line',
			options: {
				animation: false,
				scales: {
					xAxis: {
						type: 'time'
					}
				}
			},
			data: {
				datasets: []
			}
		});

		return () => chart.destroy();
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
	}
</style>