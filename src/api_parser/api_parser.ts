import { Response } from "express";
import ApiInterface from "./api_interface";

export class ApiConstructor {
    _response!: Response;
    _responseAPI?: ApiInterface;

    constructor(_response: Response) {
        this._response = _response
        return this;
    }
    setResponse(_responseAPI: ApiInterface) {
        this._responseAPI = _responseAPI;
        return this;
    }
    sendResponse() {
        this._response.set("X-Powered-By", "Les Ripeurs server")
        return this._response.status(this._responseAPI!.statusCode).json(this._responseAPI);
    }
}