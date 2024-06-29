import { z } from 'zod';

export const orElse = <T, U extends T>(defaultValue: U) => (value: T | null) => value ?? defaultValue;

export const SortOrder = z.union([z.literal('ASC'), z.literal('DESC')], { description: 'Sort order' });

export const numberQuery = z.string().transform(v => parseInt(v));

export const Page = z.object({
	search: z.string().nullable().transform(orElse('')),
	sortOrder: SortOrder.nullable().transform(orElse('DESC')),
	page: numberQuery.nullable().transform(orElse(1)),
	pageSize: numberQuery.nullable().transform(orElse(100))
})
