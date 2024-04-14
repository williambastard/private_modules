import { ErrorRequestHandler, Response } from 'express';

interface ApiInterface {
    statusCode: number;
    message: string;
    token?: string;
    data?: object | undefined;
    details?: Error | ErrorCallback | ErrorEvent | ErrorRequestHandler | unknown;
}

declare const _HTTP_400: ApiInterface;
declare const _HTTP_401: ApiInterface;
declare const _HTTP_402: ApiInterface;
declare const _HTTP_403: ApiInterface;
declare const _HTTP_404: ApiInterface;
declare const _HTTP_405: ApiInterface;
declare const _HTTP_406: ApiInterface;
declare const _HTTP_407: ApiInterface;
declare const _HTTP_498: ApiInterface;
declare const _HTTP_500: ApiInterface;
declare const _HTTP_501: ApiInterface;
declare const _HTTP_502: ApiInterface;
declare const _HTTP_503: ApiInterface;
declare const _HTTP_504: ApiInterface;
declare const _OK: ApiInterface;
declare const _CREATED: ApiInterface;
declare const _ACCEPTED: ApiInterface;
declare const _NO_CONTENT: ApiInterface;
declare const _RESET_CONTENT: ApiInterface;
declare const _PARTIAL_CONTENT: ApiInterface;
declare const _ALREADY_REPORTED: ApiInterface;

declare const ApiConstants__ACCEPTED: typeof _ACCEPTED;
declare const ApiConstants__ALREADY_REPORTED: typeof _ALREADY_REPORTED;
declare const ApiConstants__CREATED: typeof _CREATED;
declare const ApiConstants__HTTP_400: typeof _HTTP_400;
declare const ApiConstants__HTTP_401: typeof _HTTP_401;
declare const ApiConstants__HTTP_402: typeof _HTTP_402;
declare const ApiConstants__HTTP_403: typeof _HTTP_403;
declare const ApiConstants__HTTP_404: typeof _HTTP_404;
declare const ApiConstants__HTTP_405: typeof _HTTP_405;
declare const ApiConstants__HTTP_406: typeof _HTTP_406;
declare const ApiConstants__HTTP_407: typeof _HTTP_407;
declare const ApiConstants__HTTP_498: typeof _HTTP_498;
declare const ApiConstants__HTTP_500: typeof _HTTP_500;
declare const ApiConstants__HTTP_501: typeof _HTTP_501;
declare const ApiConstants__HTTP_502: typeof _HTTP_502;
declare const ApiConstants__HTTP_503: typeof _HTTP_503;
declare const ApiConstants__HTTP_504: typeof _HTTP_504;
declare const ApiConstants__NO_CONTENT: typeof _NO_CONTENT;
declare const ApiConstants__OK: typeof _OK;
declare const ApiConstants__PARTIAL_CONTENT: typeof _PARTIAL_CONTENT;
declare const ApiConstants__RESET_CONTENT: typeof _RESET_CONTENT;
declare namespace ApiConstants {
  export { ApiConstants__ACCEPTED as _ACCEPTED, ApiConstants__ALREADY_REPORTED as _ALREADY_REPORTED, ApiConstants__CREATED as _CREATED, ApiConstants__HTTP_400 as _HTTP_400, ApiConstants__HTTP_401 as _HTTP_401, ApiConstants__HTTP_402 as _HTTP_402, ApiConstants__HTTP_403 as _HTTP_403, ApiConstants__HTTP_404 as _HTTP_404, ApiConstants__HTTP_405 as _HTTP_405, ApiConstants__HTTP_406 as _HTTP_406, ApiConstants__HTTP_407 as _HTTP_407, ApiConstants__HTTP_498 as _HTTP_498, ApiConstants__HTTP_500 as _HTTP_500, ApiConstants__HTTP_501 as _HTTP_501, ApiConstants__HTTP_502 as _HTTP_502, ApiConstants__HTTP_503 as _HTTP_503, ApiConstants__HTTP_504 as _HTTP_504, ApiConstants__NO_CONTENT as _NO_CONTENT, ApiConstants__OK as _OK, ApiConstants__PARTIAL_CONTENT as _PARTIAL_CONTENT, ApiConstants__RESET_CONTENT as _RESET_CONTENT };
}

declare class Constructor {
    _response: Response;
    _responseAPI?: ApiInterface;
    constructor(_response: Response);
    setResponse(_responseAPI: ApiInterface): this;
    sendResponse(): Response<any, Record<string, any>>;
}

type ApiParser_Constructor = Constructor;
declare const ApiParser_Constructor: typeof Constructor;
declare namespace ApiParser {
  export { ApiParser_Constructor as Constructor, ApiConstants as default };
}

export { ApiParser as default };
