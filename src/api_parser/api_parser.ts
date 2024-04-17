import { Response } from "express";
import ResponseInterface from "./api_interface";

export default class parser {
    _response!: Response | any;
    _responseAPI?: ResponseInterface;

    constructor(_response: Response | any) {
        this._response = _response
        return this;
    }
    setResponse(_responseAPI: ResponseInterface) {
        this._responseAPI = _responseAPI;
        return this;
    }
    sendResponse() {
        this._response.set("X-Powered-By", "Les Ripeurs server")
        return this._response.status(this._responseAPI!.statusCode).json(this._responseAPI);
    }
}