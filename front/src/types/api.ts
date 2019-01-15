import { OutgoingHttpHeaders } from 'http';

export type RequestDataTransformation = 'post-data' | 'put-data';

export type ContentType = 'text/plain' | 'multipart/form-data' | 'application/x-www-form-urlencoded' | 'application/json';

export interface ApiRequestConfig {
    headers?: RequestHeaders;
}

export interface RequestHeaders {
    'Content-Type'?: ContentType;
    Authorization?: string;
}

export interface RawApiResponse {
    data: object;
    headers: OutgoingHttpHeaders;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
}

export interface ApiResponse {
    status: 1 | 0;
    message: string;
    data: object;
}

export interface DateObjectFromApi {
    date: string;
    timezone: string;
    timezone_type: number;
}
