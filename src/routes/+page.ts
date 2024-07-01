import { backend } from '$lib';
import { error } from '@sveltejs/kit';
import { Page } from '$lib/model';

export const prerender = false;
export const ssr = true;

export async function load(event) {
	const page = Page.parse({
		page: event.url.searchParams.get('page'),
		pageSize: event.url.searchParams.get('pageSize') ?? '100',
		search: event.url.searchParams.get('search'),
		sortOrder: event.url.searchParams.get('sortOrder')
	});

	const videos = await backend.listVideos(page).then((res) => res.data);

	if (!videos) {
		error(500, 'Failed to fetch videos');
	}

	return {
		videos
	};
}
