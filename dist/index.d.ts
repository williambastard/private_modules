import { ErrorRequestHandler, Response, Request } from 'express';

interface ApiInterface {
    statusCode: number;
    message: string;
    token?: string;
    data?: undefined | any;
    details?: Error | ErrorCallback | ErrorEvent | ErrorRequestHandler | unknown;
}

type ApiInterface$1_ApiInterface = ApiInterface;
declare namespace ApiInterface$1 {
  export type { ApiInterface$1_ApiInterface as ApiInterface, ApiInterface as default };
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
    data?: undefined | any;
    details?: unknown;
    static get(key: string): ApiInterface;
}

interface ApiFetcherInterface {
    _request: Request;
    _response: Response;
    _headers: Headers;
    _options: Object;
    _data: Map<any, any> | false;
    _session: Map<any, any> | false;
    _status: number;
    _isOK: boolean;
    _callResponse: Map<any, any>;
    _callHeaders: any;
}

declare class Call implements ApiFetcherInterface {
    _request: Request;
    _response: Response;
    _headers: Headers;
    _options: Object;
    _data: any | false;
    _session: any | false;
    _status: number;
    _isOK: boolean;
    _callResponse: any;
    _callHeaders: any;
    constructor(_request: Request, _response: Response, _mstarget: string, _msendpoint: string, _msport: number);
    fetch(): Promise<Call>;
    setStatus(_status: number): void;
    setIsOK(_isOK: boolean): void;
    setSession(_session: any | false): void;
    setCallHeaders(_callHeaders: any): void;
    setCallResponse(_callResponse: any): void;
    setData(_data: any | false): void;
    setHeaderKey(_headerKey: string, _headerValue: any): void;
    getHeaderKey(_headerKey: string): string | null;
    getToken(): string;
    getOrigin(): string;
    getFetchOptions(): RequestInit;
    getTarget(): string;
    formatKeyName(_headerKey: string): string;
    initFetchOptions(): void;
    initHeader(_mstarget: string, _msendpoint: string, _msport: number): void;
}

declare const _default: {
    ApiConstructor: typeof ApiConstructor;
    Call: typeof Call;
    ApiJSON: typeof ApiJSON;
    ApiInterface: typeof ApiInterface$1;
};

export { _default as default };
