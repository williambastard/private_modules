import { ErrorRequestHandler, Response, Request } from 'express';

interface ApiInterface {
    statusCode: number;
    message: string;
    token?: string;
    data?: object | undefined;
    details?: Error | ErrorCallback | ErrorEvent | ErrorRequestHandler | unknown;
}

declare class ApiConstructor {
    _response: Response;
    _responseAPI?: ApiInterface;
    constructor(_response: Response);
    setResponse(_responseAPI: ApiInterface): this;
    sendResponse(): Response<any, Record<string, any>>;
}

declare abstract class ApiDefaultResponse implements ApiInterface {
    statusCode: number;
    message: string;
    token?: string | undefined;
    data?: object | undefined;
    details?: unknown;
    static get(key: string): ApiInterface;
}

interface ApiFetcherInterface {
    _request: Request;
    _headers: Headers;
    _options: Object;
}

declare class ApiFetcher implements ApiFetcherInterface {
    _request: Request;
    _headers: Headers;
    _options: Object;
    constructor(_request: Request, _target: string);
    fetch(): Promise<Object>;
    initHeader(_request: Request, _target: string): void;
    initFetchOptions(): void;
    setHeaderKey(headerKey: string, headerValue: string): void;
    setFetchOption(_fetchOptionObject: Object): void;
    getHeaderKey(headerKey: string): string | null;
    getTarget(): string;
    getFetchOptions(): RequestInit;
}

declare const _default: {
    ApiConstructor: typeof ApiConstructor;
    ApiFetcher: typeof ApiFetcher;
    ApiDefaultResponse: typeof ApiDefaultResponse;
};

export { _default as default };
