import { Request } from "express";
export interface ApiFetcherInterface {
    _request: Request;
    _headers: Headers;
    _options: Object;
    _data: Map<any, any> | false;
    _session: Map<any, any> | false;
    _status: number;
    _isOK: boolean;
    _callResponse: Map<any, any>;
    _callHeaders: any;
}