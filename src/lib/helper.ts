import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export interface GotoOptions {
	replaceState?: boolean;
	noScroll?: boolean;
	keepFocus?: boolean;
	invalidateAll?: boolean;
	state?: App.PageState;
}

export function withQuery(
	searchParams: URLSearchParams,
	params: Record<string, unknown>,
	options: GotoOptions = {}
) {
	if (browser) {
		const url = new URLSearchParams(searchParams);

		Object.entries(params).forEach(([key, value]) => {
			url.set(key, `${value}`);
		});

		goto(`?${url.toString()}`, options);
	}
}
