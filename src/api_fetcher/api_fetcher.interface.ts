import { Request } from "express";
export interface ApiFetcherInterface {
    _request: Request;
    _headers: Headers;
    _options: Object;
    _data: Map<any, any> | false;
    _session: Map<any, any> | false;
    _isOK: boolean;
    _callresponse: Map<any, any>;
}