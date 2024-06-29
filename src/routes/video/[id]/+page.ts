import { backend } from '$lib';
import { z } from 'zod';
import { numberQuery, orElse, SortOrder } from '$lib/model';

const ListRecord = z.object({
	videoId: z.string(),
	interval: numberQuery.nullable().transform(orElse(1)),
	page: numberQuery
		.nullable()
		.transform(orElse(1))
		.transform((v) => Math.max(1, v)),
	pageSize: numberQuery.nullable().transform(orElse(100)),
	sortOrder: SortOrder.nullable().transform(orElse('DESC'))
});

export async function load(event) {
	const request = ListRecord.parse({
		videoId: event.params.id,
		interval: event.url.searchParams.get('interval'),
		page: event.url.searchParams.get('page'),
		pageSize: event.url.searchParams.get('pageSize'),
		sortOrder: event.url.searchParams.get('sortOrder')
	});

	const video = await backend.getVideo(request.videoId).then((res) => res.data);

	const result = await backend.listRecords(request).then((res) => res.data);

	return {
		video,
		records: result
	};
}
