import { Request } from "express";
import { ApiFetcherInterface } from "./api_fetcher.interface";
import ApiDefaultResponse from "../api_parser/api_constantes";
import ApiInterface from "../api_parser/api_interface";

export default class ApiFetcher implements ApiFetcherInterface {
    _request: Request;
    _headers: Headers = new Headers();
    _options: Object = {};

    constructor(_request: Request, _mstarget: string) {
        this._request = _request;
        this.initHeader(_request, _mstarget);
    }
    async fetch(): Promise<ApiInterface> {
        const response = await fetch(`${this.getTarget()}`, this.getFetchOptions())
        const _ms_response = await response.json();
        return _ms_response ?? ApiDefaultResponse.get("ERROR");
    }

    setHeaderKey(headerKey: string, headerValue: string) {
        this._headers.set(headerKey, headerValue);
    }

    setFetchOption(_fetchOptionObject: Object) {
        Object.assign(this._options, _fetchOptionObject);
    }

    getHeaderKey(headerKey: string) {
        return this._headers.get(headerKey);
    }

    getFetchOptions(): RequestInit {
        this.initFetchOptions();
        return this._options as RequestInit
    }

    getToken(): string {
        return this._request.get('token') ?? "";
    }

    getOrigin(): string {
        return this._request.get('origin') ?? "";
    }

    getTarget() {
        return this.getHeaderKey("ms-target-protocol") +
            "://" + this.getHeaderKey("ms-target-service") +
            "." + this.getHeaderKey("ms-target-host") +
            "/" + this.getHeaderKey("ms-target-service") +
            "/" + this.getHeaderKey('ms-target-endpoint');
    }
    initFetchOptions() {
        this.setFetchOption(this._headers);
        this.setFetchOption({ "method": this._request.method });
        this.setFetchOption({ "body": this._request.body });
    }
    initHeader(_request: Request, _target: string) {
        this.setHeaderKey('origin', this.getOrigin());
        this.setHeaderKey('token', this.getToken());
        this.setHeaderKey('credentials', 'include');
        this.setHeaderKey('author', 'William BASTARD');
        this.setHeaderKey('content-type', 'application/json');
        this.setHeaderKey('accept', 'application/json');

        this.setHeaderKey('ms-user-method', _request.method);
        this.setHeaderKey('ms-target-service', _target);
        this.setHeaderKey('ms-target-protocol', 'http');
        this.setHeaderKey('ms-target-host', 'service.riptest:8282');
        this.setHeaderKey('ms-target-endpoint', _request.url.replace('/', ''));
    }
}