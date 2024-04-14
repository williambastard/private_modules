import { Request } from "express";
export interface ApiFetcherInterface {
    _request: Request;
    _headers: Headers;
    _options: Object;
}