import { ErrorRequestHandler, Response } from 'express';

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
    headers: Headers;
    method: string;
    body?: any;
}

declare class ApiFetcher implements ApiFetcherInterface {
    headers: Headers;
    method: string;
    body?: any;
    constructor(method: string);
    fetch(_apiFetcherOptions: ApiFetcherInterface): Promise<Object>;
    getHeader(headerKey: string): string | null;
    setHeader(headerKey: string, headerValue: string): void;
    setHeaderObject(headerObjectOptions: Object): void;
    setMethod(method: string): void;
    setBody(body: object): void;
    getTarget(): string;
}

declare const _default: {
    ApiConstructor: typeof ApiConstructor;
    ApiFetcher: typeof ApiFetcher;
    ApiDefaultResponse: typeof ApiDefaultResponse;
};

export { _default as default };
