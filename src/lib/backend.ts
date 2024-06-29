import type {
	OpenAPIClient,
	Parameters,
	UnknownParamsObject,
	OperationResponse,
	AxiosRequestConfig
} from 'openapi-client-axios';

/* eslint-disable */
export declare namespace Components {
	export namespace Schemas {
		export interface PageMetadata {
			size: number; // int64
			number: number; // int64
			totalElements: number; // int64
			totalPages: number; // int64
		}
		export interface PageResponseRecord {
			content: Record[];
			page: PageMetadata;
		}
		export interface PageResponseRecordResponse {
			content: RecordResponse[];
			page: PageMetadata;
		}
		export interface PageResponseVideoResponse {
			content: VideoResponse[];
			page: PageMetadata;
		}
		export interface RaceException {
			status?:
				| '100 CONTINUE'
				| '101 SWITCHING_PROTOCOLS'
				| '102 PROCESSING'
				| '103 EARLY_HINTS'
				| '103 CHECKPOINT'
				| '200 OK'
				| '201 CREATED'
				| '202 ACCEPTED'
				| '203 NON_AUTHORITATIVE_INFORMATION'
				| '204 NO_CONTENT'
				| '205 RESET_CONTENT'
				| '206 PARTIAL_CONTENT'
				| '207 MULTI_STATUS'
				| '208 ALREADY_REPORTED'
				| '226 IM_USED'
				| '300 MULTIPLE_CHOICES'
				| '301 MOVED_PERMANENTLY'
				| '302 FOUND'
				| '302 MOVED_TEMPORARILY'
				| '303 SEE_OTHER'
				| '304 NOT_MODIFIED'
				| '305 USE_PROXY'
				| '307 TEMPORARY_REDIRECT'
				| '308 PERMANENT_REDIRECT'
				| '400 BAD_REQUEST'
				| '401 UNAUTHORIZED'
				| '402 PAYMENT_REQUIRED'
				| '403 FORBIDDEN'
				| '404 NOT_FOUND'
				| '405 METHOD_NOT_ALLOWED'
				| '406 NOT_ACCEPTABLE'
				| '407 PROXY_AUTHENTICATION_REQUIRED'
				| '408 REQUEST_TIMEOUT'
				| '409 CONFLICT'
				| '410 GONE'
				| '411 LENGTH_REQUIRED'
				| '412 PRECONDITION_FAILED'
				| '413 PAYLOAD_TOO_LARGE'
				| '413 REQUEST_ENTITY_TOO_LARGE'
				| '414 URI_TOO_LONG'
				| '414 REQUEST_URI_TOO_LONG'
				| '415 UNSUPPORTED_MEDIA_TYPE'
				| '416 REQUESTED_RANGE_NOT_SATISFIABLE'
				| '417 EXPECTATION_FAILED'
				| '418 I_AM_A_TEAPOT'
				| '419 INSUFFICIENT_SPACE_ON_RESOURCE'
				| '420 METHOD_FAILURE'
				| '421 DESTINATION_LOCKED'
				| '422 UNPROCESSABLE_ENTITY'
				| '423 LOCKED'
				| '424 FAILED_DEPENDENCY'
				| '425 TOO_EARLY'
				| '426 UPGRADE_REQUIRED'
				| '428 PRECONDITION_REQUIRED'
				| '429 TOO_MANY_REQUESTS'
				| '431 REQUEST_HEADER_FIELDS_TOO_LARGE'
				| '451 UNAVAILABLE_FOR_LEGAL_REASONS'
				| '500 INTERNAL_SERVER_ERROR'
				| '501 NOT_IMPLEMENTED'
				| '502 BAD_GATEWAY'
				| '503 SERVICE_UNAVAILABLE'
				| '504 GATEWAY_TIMEOUT'
				| '505 HTTP_VERSION_NOT_SUPPORTED'
				| '506 VARIANT_ALSO_NEGOTIATES'
				| '507 INSUFFICIENT_STORAGE'
				| '508 LOOP_DETECTED'
				| '509 BANDWIDTH_LIMIT_EXCEEDED'
				| '510 NOT_EXTENDED'
				| '511 NETWORK_AUTHENTICATION_REQUIRED';
			message?: string;
			causes?: string[];
		}
		export interface Record {
			id?: string; // uuid
			views?: number; // int64
			createdAt?: string; // date-time
			video?: Video;
		}
		export interface RecordResponse {
			id: string; // uuid
			views: number; // int64
			createdAt: string; // date-time
		}
		export interface UploadVideoRequest {
			startAt?: string; // date-time
			endAt: string; // date-time
		}
		export interface Video {
			id?: string;
			title?: string;
			addedAt?: string; // date-time
			type: 'UPLOAD' | 'PREMIERE' | 'UPCOMING' | 'LIVE' | 'PRIVATE';
			status: 'SCHEDULED' | 'ACTIVE' | 'PANIC' | 'COMPLETED';
			startAt: string; // date-time
			endAt: string; // date-time
			panicMessage?: string;
			expired?: boolean;
		}
		export interface VideoInfo {
			videoId: string;
			uploadDate: string; // date-time
			publishDate: string; // date-time
			type: 'UPLOAD' | 'PREMIERE' | 'UPCOMING' | 'LIVE' | 'PRIVATE';
			author: string;
			title: string;
			description?: string;
			views: number; // int64
		}
		export interface VideoResponse {
			id: string;
			title: string;
			addedAt: string; // date-time
			type: 'UPLOAD' | 'PREMIERE' | 'UPCOMING' | 'LIVE' | 'PRIVATE';
			status: 'SCHEDULED' | 'ACTIVE' | 'PANIC' | 'COMPLETED';
			startAt: string; // date-time
			endAt: string; // date-time
			panicMessage?: string;
		}
	}
}
declare namespace Paths {
	namespace AddVideo {
		namespace Parameters {
			export type VideoId = string[];
		}
		export interface QueryParameters {
			videoId: Parameters.VideoId;
		}
		export type RequestBody = Components.Schemas.UploadVideoRequest;
		namespace Responses {
			export type $200 = Components.Schemas.Video[];
			export type $400 = Components.Schemas.RaceException;
		}
	}
	namespace CreateRecord {
		export type RequestBody = Components.Schemas.Record;
		namespace Responses {
			export type $200 = Components.Schemas.Record;
		}
	}
	namespace GetRecord {
		namespace Parameters {
			export type RecordId = string;
		}
		export interface PathParameters {
			recordId: Parameters.RecordId;
		}
		namespace Responses {
			export type $200 = Components.Schemas.Record;
		}
	}
	namespace GetVideo {
		namespace Parameters {
			export type VideoId = string;
		}
		export interface PathParameters {
			videoId: Parameters.VideoId;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VideoResponse;
		}
	}
	namespace GetVideoInfo {
		namespace Parameters {
			export type VideoId = string[];
		}
		export interface QueryParameters {
			videoId: Parameters.VideoId;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VideoInfo[];
			export type $400 = Components.Schemas.RaceException;
		}
	}
	namespace ListRecords {
		namespace Parameters {
			export type After = string; // date-time
			export type Before = string; // date-time
			export type Interval = number; // int32
			export type Page = number; // int32
			export type PageSize = number; // int32
			export type SortOrder = 'ASC' | 'DESC';
			export type VideoId = string;
		}
		export interface PathParameters {
			videoId: Parameters.VideoId;
		}
		export interface QueryParameters {
			interval?: Parameters.Interval /* int32 */;
			after?: Parameters.After /* date-time */;
			before?: Parameters.Before /* date-time */;
			page?: Parameters.Page /* int32 */;
			pageSize?: Parameters.PageSize /* int32 */;
			sortOrder?: Parameters.SortOrder;
		}
		namespace Responses {
			export type $200 = Components.Schemas.PageResponseRecordResponse;
		}
	}
	namespace ListRecords1 {
		namespace Parameters {
			export type After = string; // date-time
			export type Before = string; // date-time
			export type Interval = number; // int32
			export type Page = number; // int32
			export type PageSize = number; // int32
			export type SortOrder = 'ASC' | 'DESC';
		}
		export interface QueryParameters {
			interval?: Parameters.Interval /* int32 */;
			after?: Parameters.After /* date-time */;
			before?: Parameters.Before /* date-time */;
			page?: Parameters.Page /* int32 */;
			pageSize?: Parameters.PageSize /* int32 */;
			sortOrder?: Parameters.SortOrder;
		}
		namespace Responses {
			export type $200 = Components.Schemas.PageResponseRecord;
		}
	}
	namespace ListVideos {
		namespace Parameters {
			export type Page = number; // int32
			export type PageSize = number; // int32
			export type Search = string;
			export type SortOrder = 'ASC' | 'DESC';
		}
		export interface QueryParameters {
			search?: Parameters.Search;
			page?: Parameters.Page /* int32 */;
			pageSize?: Parameters.PageSize /* int32 */;
			sortOrder?: Parameters.SortOrder;
		}
		namespace Responses {
			export type $200 = Components.Schemas.PageResponseVideoResponse;
		}
	}
	namespace RestartVideo {
		namespace Parameters {
			export type VideoId = string[];
		}
		export interface QueryParameters {
			videoId: Parameters.VideoId;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VideoResponse[];
		}
	}
	namespace StopVideo {
		namespace Parameters {
			export type VideoId = string[];
		}
		export interface QueryParameters {
			videoId: Parameters.VideoId;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VideoResponse[];
		}
	}
}

export interface OperationMethods {
	/**
	 * stopVideo - Stop videos
	 *
	 * Stop videos that are active
	 */
	'stopVideo'(
		parameters?: Parameters<Paths.StopVideo.QueryParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.StopVideo.Responses.$200>;
	/**
	 * restartVideo - Restart videos
	 *
	 * Restart videos that are stopped
	 */
	'restartVideo'(
		parameters?: Parameters<Paths.RestartVideo.QueryParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.RestartVideo.Responses.$200>;
	/**
	 * addVideo - Track videos
	 *
	 * Add video to the database
	 */
	'addVideo'(
		parameters?: Parameters<Paths.AddVideo.QueryParameters> | null,
		data?: Paths.AddVideo.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.AddVideo.Responses.$200>;
	/**
	 * listRecords_1
	 */
	'listRecords_1'(
		parameters?: Parameters<Paths.ListRecords1.QueryParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.ListRecords1.Responses.$200>;
	/**
	 * createRecord
	 */
	'createRecord'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.CreateRecord.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.CreateRecord.Responses.$200>;
	/**
	 * getVideo
	 */
	'getVideo'(
		parameters?: Parameters<Paths.GetVideo.PathParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.GetVideo.Responses.$200>;
	/**
	 * listRecords - List records
	 *
	 * List records of a video
	 */
	'listRecords'(
		parameters?: Parameters<
			Paths.ListRecords.QueryParameters & Paths.ListRecords.PathParameters
		> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.ListRecords.Responses.$200>;
	/**
	 * getVideoInfo - Get video info
	 *
	 * Retrieve video information from Invidious and Holodex
	 */
	'getVideoInfo'(
		parameters?: Parameters<Paths.GetVideoInfo.QueryParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.GetVideoInfo.Responses.$200>;
	/**
	 * listVideos - List videos
	 *
	 * List videos in the database
	 */
	'listVideos'(
		parameters?: Parameters<Paths.ListVideos.QueryParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.ListVideos.Responses.$200>;
	/**
	 * getRecord
	 */
	'getRecord'(
		parameters?: Parameters<Paths.GetRecord.PathParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.GetRecord.Responses.$200>;
}

export interface PathsDictionary {
	['/api/videos/stop']: {
		/**
		 * stopVideo - Stop videos
		 *
		 * Stop videos that are active
		 */
		'post'(
			parameters?: Parameters<Paths.StopVideo.QueryParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.StopVideo.Responses.$200>;
	};
	['/api/videos/restart']: {
		/**
		 * restartVideo - Restart videos
		 *
		 * Restart videos that are stopped
		 */
		'post'(
			parameters?: Parameters<Paths.RestartVideo.QueryParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.RestartVideo.Responses.$200>;
	};
	['/api/videos/add']: {
		/**
		 * addVideo - Track videos
		 *
		 * Add video to the database
		 */
		'post'(
			parameters?: Parameters<Paths.AddVideo.QueryParameters> | null,
			data?: Paths.AddVideo.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.AddVideo.Responses.$200>;
	};
	['/api/records/']: {
		/**
		 * listRecords_1
		 */
		'get'(
			parameters?: Parameters<Paths.ListRecords1.QueryParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.ListRecords1.Responses.$200>;
		/**
		 * createRecord
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.CreateRecord.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.CreateRecord.Responses.$200>;
	};
	['/api/videos/{videoId}']: {
		/**
		 * getVideo
		 */
		'get'(
			parameters?: Parameters<Paths.GetVideo.PathParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.GetVideo.Responses.$200>;
	};
	['/api/videos/{videoId}/records']: {
		/**
		 * listRecords - List records
		 *
		 * List records of a video
		 */
		'get'(
			parameters?: Parameters<
				Paths.ListRecords.QueryParameters & Paths.ListRecords.PathParameters
			> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.ListRecords.Responses.$200>;
	};
	['/api/videos/info']: {
		/**
		 * getVideoInfo - Get video info
		 *
		 * Retrieve video information from Invidious and Holodex
		 */
		'get'(
			parameters?: Parameters<Paths.GetVideoInfo.QueryParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.GetVideoInfo.Responses.$200>;
	};
	['/api/videos/']: {
		/**
		 * listVideos - List videos
		 *
		 * List videos in the database
		 */
		'get'(
			parameters?: Parameters<Paths.ListVideos.QueryParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.ListVideos.Responses.$200>;
	};
	['/api/records/{recordId}']: {
		/**
		 * getRecord
		 */
		'get'(
			parameters?: Parameters<Paths.GetRecord.PathParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.GetRecord.Responses.$200>;
	};
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
