import { ErrorRequestHandler, Response, Request } from 'express';

interface ResponseInterface {
    statusCode: number;
    message: string;
    token?: string;
    data?: undefined | any;
    details?: Error | ErrorCallback | ErrorEvent | ErrorRequestHandler | unknown;
}

declare class parser {
    _response: Response | any;
    _responseAPI?: ResponseInterface;
    constructor(_response: Response | any);
    setResponse(_responseAPI: ResponseInterface): this;
    sendResponse(): any;
}

declare abstract class messages implements ResponseInterface {
    statusCode: number;
    message: string;
    token?: string | undefined;
    data?: undefined | any;
    details?: unknown;
    static use(key: string): ResponseInterface;
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

declare class call implements ApiFetcherInterface {
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
    setGatewayIp(_gatewayIp: string): void;
    fetch(): Promise<call>;
    setStatus(_status: number): void;
    setIsOK(_isOK: boolean): void;
    setSession(_session: any | false): void;
    setcallHeaders(_callHeaders: any): void;
    setcallResponse(_callResponse: any): void;
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

export { type ResponseInterface, call, messages, parser };
