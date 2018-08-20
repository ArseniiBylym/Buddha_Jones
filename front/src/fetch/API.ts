import axios from 'axios';
import { merge as _merge } from 'lodash';
import { ApiRequestConfig, RequestDataTransformation } from 'types/api';

export class API {
    // General API constants
    static URL =
        process.env && process.env.REACT_APP_API_URL
            ? process.env.REACT_APP_API_URL
            : 'http://api.buddhajones.redidemo.com';
    static AUTH_HEADER = 'Authorization';

    // Base configs
    static REQUEST_CONFIG: ApiRequestConfig = {
        headers: { 'Content-Type': 'text/plain' },
    };
    static REQUEST_CONFIG_FORM_DATA: ApiRequestConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    static REQUEST_CONFIG_URL_ENCODED: ApiRequestConfig = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    /** Fetch GET */
    static getData = async (endpoint: string, data: object = {}, returnOnlyData: boolean = true): Promise<object> => {
        try {
            let config: ApiRequestConfig = API.REQUEST_CONFIG;
            config = API.setAuthenticationHeaders(config);

            const urlQuery = API.prepareUrlQuery(data);

            const response = await axios.get(API.URL + endpoint + urlQuery, config);

            return returnOnlyData
                ? typeof response.data.data !== 'undefined'
                    ? response.data.data
                    : response.data
                : response;
        } catch (error) {
            throw error;
        }
    };

    /** Fetch POST */
    static postData = async (
        endpoint: string,
        data: object = {},
        configuration: ApiRequestConfig | null = null,
        transformData: RequestDataTransformation | null = 'post-data',
        returnOnlyData: boolean = true
    ): Promise<object> => {
        try {
            // Configure
            let config: ApiRequestConfig = API.REQUEST_CONFIG;
            if (configuration) {
                config = { ...config, ...configuration };
            }

            // Set authentication headers
            config = API.setAuthenticationHeaders(config);

            // Prepare data
            let body: object | FormData | string = data;

            // Transform data if requested
            config = _merge(config, API.REQUEST_CONFIG_FORM_DATA);
            if (transformData === 'post-data') {
                body = API.preparePostData(data);
            } else if (transformData === 'put-data') {
                body = API.preparePutData(data);
            }

            // Call the API
            const response = await axios.post(API.URL + endpoint, body, config);

            // Return API response
            return returnOnlyData
                ? typeof response.data.data !== 'undefined'
                    ? response.data.data
                    : response.data
                : response;
        } catch (error) {
            throw error;
        }
    };

    /** Fetch PUT */
    static putData = async (
        endpoint: string,
        data: object = {},
        configuration: ApiRequestConfig | null = null,
        transformData: RequestDataTransformation | null = 'put-data',
        returnOnlyData: boolean = true
    ): Promise<object> => {
        try {
            // Configure
            let config: ApiRequestConfig = API.REQUEST_CONFIG;
            if (configuration) {
                config = { ...config, ...configuration };
            }

            // Set authentication headers
            config = API.setAuthenticationHeaders(config);

            // Prepare data
            let body: object | FormData | string = data;

            // Transform data if requested
            config = _merge(config, API.REQUEST_CONFIG_URL_ENCODED);
            if (transformData === 'post-data') {
                body = API.preparePostData(data);
            } else if (transformData === 'put-data') {
                body = API.preparePutData(data);
            }

            // Call the API
            const response = await axios.put(API.URL + endpoint, body, config);

            // Return API response
            return returnOnlyData
                ? typeof response.data.data !== 'undefined'
                    ? response.data.data
                    : response.data
                : response;
        } catch (error) {
            throw error;
        }
    };

    /** Fetch DELETE */
    static deleteData = async (
        endpoint: string,
        configuration: ApiRequestConfig | null = null,
        returnOnlyData: boolean = true
    ): Promise<object> => {
        try {
            // Configure
            let config = API.REQUEST_CONFIG;
            if (configuration) {
                config = _merge(config, configuration);
            }

            // Set authentication headers
            config = API.setAuthenticationHeaders(config);

            // Call the API
            const response = await axios.delete(API.URL + endpoint, config);

            // Return API response
            return returnOnlyData
                ? typeof response.data.data !== 'undefined'
                    ? response.data.data
                    : response.data
                : response;
        } catch (error) {
            throw error;
        }
    };

    static setAuthenticationHeaders = (config: ApiRequestConfig = {}): ApiRequestConfig => {
        const token = API.getAuthenticationToken();

        return {
            ...config,
            headers: {
                ...(typeof config.headers !== 'undefined' && config.headers && config.headers),
                ...(token && {
                    Authorization: 'Bearer ' + token,
                }),
            },
        };
    };

    static getAuthenticationToken = (): string => {
        let token: string = '';

        if (typeof Storage !== 'undefined') {
            token = localStorage.getItem(API.AUTH_HEADER) || '';

            if (token === '') {
                localStorage.removeItem(API.AUTH_HEADER);
            }
        }

        return token || '';
    };

    static prepareUrlQuery = (properties: object = {}): string => {
        const urlQuery = API.preparePutData(properties);
        return urlQuery !== '' ? '?' + urlQuery : '';
    };

    static preparePostData = (properties: object = {}): FormData => {
        let form = new FormData();

        Object.keys(properties).forEach(key => {
            if (properties[key] !== undefined) {
                form.append(key, properties[key]);
            }
        });

        return form;
    };

    static preparePutData = (properties: object = {}): string => {
        return Object.keys(properties)
            .filter(key => key && typeof properties[key] !== 'undefined')
            .map(key => `${key}=${encodeURIComponent(properties[key])}`)
            .join('&');
    };
}
