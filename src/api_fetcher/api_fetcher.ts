import { Request } from "express";
import { ApiFetcherInterface } from "./api_fetcher.interface";
import ApiDefaultResponse from "../api_parser/api_constantes";
import ApiInterface from "../api_parser/api_interface";

export default class Call implements ApiFetcherInterface {
    _request: Request;
    _headers: Headers = new Headers();
    _options: Object = {};
    _data: any | false = false;
    _session: any | false = false;
    _status: number = 500;
    _isOK: boolean = false;
    _callresponse: any = new Map();

    constructor(_request: Request, _mstarget: string) {
        this._request = _request;
        this.initHeader(_request, _mstarget);
    }
    async fetch(): Promise<Call> {
        const response = await fetch(`${this.getTarget()}`, this.getFetchOptions())
        const _ms_response = await response.json();
        const _ms_user_data = _ms_response!.data ?? false;
        const _ms_user_session = _ms_user_data!.session ?? false;
        this.setIsOK(response.ok);
        this.setStatus(response.status);
        this.setCallResponse(_ms_response);
        this.setSession(_ms_user_session);
        this.setData(_ms_user_data);
        return this;
    }

    setStatus(_status: number) {
        this._status = _status
    }
    setIsOK(_isOK: boolean) {
        this._isOK = _isOK
    }

    setSession(_session: any | false) {
        this._session = _session;
    }

    setCallResponse(_callresponse: any) {
        this._callresponse = _callresponse;
    }

    setData(_data: any | false) {
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
        return this._request.get('Token') ?? "";
    }

    getOrigin(): string {
        return this._request.get('Origin') ?? "";
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
        this.setFetchOption({"method": this._request.method });
        this.setFetchOption({"body": this._request.body });
    }
    initHeader(_request: Request, _target: string) {
        this.setHeaderKey('Origin', this.getOrigin());
        this.setHeaderKey('Token', this.getToken());
        this.setHeaderKey('Credentials', 'include');
        this.setHeaderKey('Author', 'William BASTARD');
        this.setHeaderKey('Content-type', 'application/json');
        this.setHeaderKey('Accept', 'application/json');

        this.setHeaderKey('Ms-user-method', _request.method);
        this.setHeaderKey('Ms-target-service', _target);
        this.setHeaderKey('Ms-target-protocol', 'http');
        this.setHeaderKey('Ms-target-host', 'service.riptest:8282');
        this.setHeaderKey('Ms-target-endpoint', _request.url.replace('/', ''));
    }
}