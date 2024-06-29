import type { Client as Backend } from './backend';
import { OpenAPIClientAxios } from 'openapi-client-axios';

const api = new OpenAPIClientAxios({
	definition: import.meta.env.VITE_OPENAPI_URL,
	axiosConfigDefaults: {
		paramsSerializer: {
			indexes: null
		}
	}
});

export const backend = await api.init<Backend>();

export * from './backend';
