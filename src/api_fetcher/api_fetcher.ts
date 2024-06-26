import { Response, Request } from "express";
import { ApiFetcherInterface } from "./api_fetcher.interface";
import messages from "../api_parser/api_messages";

export default class call implements ApiFetcherInterface {
    _request: Request;
    _response: Response;
    _headers: Headers = new Headers();
    _options: Object = {};
    _data: any | false = false;
    _session: any | false = false;
    _status: number = 500;
    _isOK: boolean = false;
    _callResponse: any = new Map();
    _callHeaders: any;

    constructor(_request: Request, _response: Response, _mstarget: string, _msendpoint: string, _msport: number) {
        this._request = _request;
        this._response = _response;
        this.initHeader(_mstarget, _msendpoint, _msport);
    }

    setGatewayIp(_gatewayIp: string) {
        this.setHeaderKey("ms-secure-ip", _gatewayIp);
        return this;
    }

    async fetch(): Promise<call> {
        this.getFetchOptions();
        try {
            const responsePromise = await fetch(`${this.getTarget()}`, this._options)
            const _ms_response = await responsePromise;
            const _ms_response_json = await responsePromise.json();
            const _ms_headers = await responsePromise.headers;
            const _ms_user_data = _ms_response_json!.data ?? false;
            const _ms_user_session = _ms_user_data!.session ?? false;

            this.setIsOK(_ms_response.ok);
            this.setStatus(_ms_response.status);
            this.setcallResponse(_ms_response_json);
            this.setcallHeaders(_ms_headers);
            this.setSession(_ms_user_session);
            this.setData(_ms_user_data);
        }
        catch (UncaughtException) {
            let error = messages.use("HTTP_500");
            error.details = UncaughtException;

            this.setIsOK(false);
            this.setStatus(500);
            this.setcallResponse(error);
            this.setSession(false);
            this.setData(false);
        }
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

    setcallHeaders(_callHeaders: any) {
        // Convertir les en-têtes en un objet clé-valeur
        const fetchHeaders: Record<string, string> = {};
        for (const [_headerKey, _headerValue] of _callHeaders.entries()) {
            fetchHeaders[_headerKey] = _headerValue;
        }
        // Définir les en-têtes dans la réponse Express
        for (const [_headerKey, _headerValue] of Object.entries(fetchHeaders)) {
            this._response.set(this.formatKeyName(_headerKey), _headerValue as string);
        }
        this._callHeaders = _callHeaders;
    }

    setcallResponse(_callResponse: any) {
        this._callResponse = _callResponse;
    }

    setData(_data: any | false) {
        this._data = _data;
    }

    setHeaderKey(_headerKey: string, _headerValue: any) {
        this._headers.set(this.formatKeyName(_headerKey), _headerValue);
    }

    getHeaderKey(_headerKey: string) {
        const _returnHeader = this._headers.get(this.formatKeyName(_headerKey));
        return _returnHeader;
    }

    getToken(): string {
        return this._request.get('Authorization') ?? "";
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

    formatKeyName(_headerKey: string) {
        _headerKey = _headerKey.toLowerCase();
        _headerKey = _headerKey.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-');
        return _headerKey;
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
        this.setHeaderKey('authorization', this.getToken());
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