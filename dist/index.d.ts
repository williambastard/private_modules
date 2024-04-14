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

declare abstract class ApiJSON implements ApiInterface {
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
    _data: Map<any, any> | false;
    _session: Map<any, any> | false;
    _isOK: boolean;
    _callresponse: Map<any, any>;
}

declare class Call implements ApiFetcherInterface {
    _request: Request;
    _headers: Headers;
    _options: Object;
    _data: any | false;
    _session: any | false;
    _isOK: boolean;
    _callresponse: any;
    constructor(_request: Request, _mstarget: string);
    fetch(): Promise<Call>;
    setIsOK(_isOK: boolean): void;
    setSession(_session: any | false): void;
    setCallResponse(_callresponse: any): void;
    setData(_data: any | false): void;
    setFetchOption(_fetchOptionObject: Object): void;
    setHeaderKey(headerKey: string, headerValue: string): void;
    getHeaderKey(headerKey: string): string | null;
    getToken(): string;
    getOrigin(): string;
    getFetchOptions(): RequestInit;
    getTarget(): string;
    initFetchOptions(): void;
    initHeader(_request: Request, _target: string): void;
}

declare const _default: {
    ApiConstructor: typeof ApiConstructor;
    Call: typeof Call;
    ApiJSON: typeof ApiJSON;
};

export { _default as default };
