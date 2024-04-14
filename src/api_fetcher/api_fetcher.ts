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

    constructor(_request: Request, _mstarget: string, _msendpoint: string, _msport: number) {
        this._request = _request;
        this.initHeader(_mstarget, _msendpoint, _msport);
    }
    async fetch(): Promise<Call> {
        this.getFetchOptions();
        const response = await fetch(`${this.getTarget()}`, this._options)
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

    setHeaderKey(headerKey: string, headerValue: any) {
        headerKey = headerKey.toLowerCase();
        headerKey = headerKey.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-');
        this._headers.set(headerKey, headerValue);
    }

    getHeaderKey(_headerKey: string) {
        const _returnHeader = this._headers.get(_headerKey.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-'));
        return _returnHeader;
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
            ":" + this.getHeaderKey("ms-target-port") +
            "/" + this.getHeaderKey("ms-target-service") +
            "/" + this.getHeaderKey('ms-target-endpoint');
    }

    initFetchOptions() {
        if (["POST", "PATCH", "PUT", "DELETE"].includes(this._request.method)) {
            Object.assign(this._options, {
                "headers": this._headers,
                "method": this._request.method,
                "body": JSON.stringify(this._request.body)

            });
        } else {
            Object.assign(this._options, {
                "headers": this._headers,
                "method": this._request.method
            });
        }
    }
    initHeader(_mstarget: string, _msendpoint: string, _msport: number) {
        this.setHeaderKey('origin', this.getOrigin());
        this.setHeaderKey('token', this.getToken());
        this.setHeaderKey('credentials', 'include');
        this.setHeaderKey('author', 'William BASTARD');
        this.setHeaderKey('content-type', 'application/json');
        this.setHeaderKey('accept', 'application/json');

        this.setHeaderKey('ms-user-method', this._request.method);
        this.setHeaderKey('ms-target-service', _mstarget);
        this.setHeaderKey('ms-target-protocol', 'http');
        this.setHeaderKey('ms-target-host', 'service.riptest');
        this.setHeaderKey('ms-target-port', _msport);
        this.setHeaderKey('ms-target-endpoint', _msendpoint);
    }
}