import { backend } from '$lib';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { DateTime } from 'luxon';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const video = data.get('video');

		if (!video) {
			error(400, 'No video id specified');
		}

		const startDate = parseDate(data.get('start-date'));
		const endDate = parseDate(data.get('end-date'));

		const response = await backend.addVideo(
			{ videoId: [video.toString()] },
			{ startAt: startDate, endAt: endDate }
		);

		const videoId = response.data[0].id;

		if (!videoId) {
			redirect(303, '/');
		}

		redirect(303, `/video/${videoId}`);
	}
} satisfies Actions;

function parseDate(date: unknown): string | undefined {
	if (typeof date !== 'string') {
		return undefined;
	}

	return DateTime.fromISO(date, { zone: 'JST' }).toISO() ?? undefined;
}
