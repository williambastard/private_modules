import { ApiFetcherInterface } from "./api_fetcher.interface";

export default class ApiFetcher implements ApiFetcherInterface {
    headers: Headers;
    method: string;
    body?: any;

    constructor(method: string) {
        this.headers = new Headers({
            'author': 'William BASTARD',
            'content-type': 'application/json'
        });
        this.method = method;
    }

    async fetch(_apiFetcherOptions: ApiFetcherInterface): Promise<Object> {
        const response = await fetch(`${this.getTarget()}`, _apiFetcherOptions)
        const _ms_response = await response.json();
        return _ms_response ?? {};
    }

    getHeader(headerKey: string) {
        return this.headers.get(headerKey);
    }
    setHeader(headerKey: string, headerValue: string) {
        this.headers.set(headerKey, headerValue);
    }
    setHeaderObject(headerObjectOptions: Object) {
        Object.assign(this.headers, headerObjectOptions);
    }
    setMethod(method: string) {
        this.method = method;
    }
    setBody(body: object) {
        this.body = JSON.stringify(body);
    }
    getTarget() {
        return this.getHeader("ms-target-protocol") +
            "://" + this.getHeader("ms-target-host") +
            "/" + this.getHeader("ms-target-service") +
            "/" + this.getHeader('ms-target-endpoint');
    }
}