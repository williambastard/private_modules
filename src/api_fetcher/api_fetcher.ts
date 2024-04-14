import { Request } from "express";
import { ApiFetcherInterface } from "./api_fetcher.interface";
import ApiDefaultResponse from "../api_parser/api_constantes";
import ApiInterface from "../api_parser/api_interface";

export default class Call implements ApiFetcherInterface {
    _request: Request;
    _headers: Headers = new Headers();
    _options: Object = {};
    _data: Map<any, any> | false = false;
    _session: Map<any, any> | false = false;
    _isOK: boolean = false;

    constructor(_request: Request, _mstarget: string) {
        this._request = _request;
        this.initHeader(_request, _mstarget);
    }
    async fetch(): Promise<ApiInterface> {
        const response = await fetch(`${this.getTarget()}`, this.getFetchOptions())
        const _ms_response = await response.json();
        const _ms_user_data = _ms_response!.data ?? false;
        const _ms_user_session = _ms_user_data!.session ?? false;
        this.setSession(_ms_user_session);
        this.setData(_ms_user_data);
        this.setIsOK(response.ok);
        return _ms_response ?? ApiDefaultResponse.get("ERROR");
    }

    setIsOK(_isOK: boolean) {
        this._isOK = _isOK
    }

    setSession(_session: Map<any, any> | false) {
        this._session = _session;
    }

    setData(_data: Map<any, any> | false) {
        this._data = _data;
    }

    setFetchOption(_fetchOptionObject: Object) {
        Object.assign(this._options, _fetchOptionObject);
    }

    setHeaderKey(headerKey: string, headerValue: string) {
        this._headers.set(headerKey, headerValue);
    }

    getHeaderKey(headerKey: string) {
        return this._headers.get(headerKey);
    }

    getToken(): string {
        return this._request.get('token') ?? "";
    }

    getOrigin(): string {
        return this._request.get('origin') ?? "";
    }

    getIsOK(): boolean {
        return this._isOK;
    }

    getSession(): Map<any, any> | false {
        return this._session;
    }

    getData(): Map<any, any> | false {
        return this._data;
    }

    getFetchOptions(): RequestInit {
        this.initFetchOptions();
        return this._options as RequestInit
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