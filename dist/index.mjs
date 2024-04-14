var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/api_parser/api_parser.ts
var ApiConstructor = class {
  constructor(_response) {
    this._response = _response;
    return this;
  }
  setResponse(_responseAPI) {
    this._responseAPI = _responseAPI;
    return this;
  }
  sendResponse() {
    return this._response.status(this._responseAPI.statusCode).json(this._responseAPI);
  }
};

// src/api_parser/api_constantes.ts
var ApiResponseMap = class {
};
ApiResponseMap.map = /* @__PURE__ */ new Map([
  ["HTTP_400", { statusCode: 400, message: "Bad Request" }],
  ["HTTP_401", { statusCode: 401, message: "Unauthorized" }],
  ["HTTP_402", { statusCode: 402, message: "Payment Required" }],
  ["HTTP_403", { statusCode: 403, message: "Forbidden" }],
  ["HTTP_404", { statusCode: 404, message: "Not Found" }],
  ["HTTP_405", { statusCode: 405, message: "Not Allowed" }],
  ["HTTP_406", { statusCode: 406, message: "Not Acceptable" }],
  ["HTTP_407", { statusCode: 407, message: "Proxy Authentication required" }],
  ["HTTP_498", { statusCode: 498, message: "Token expired / invalid" }],
  ["HTTP_500", { statusCode: 500, message: "Internal Server Error" }],
  ["HTTP_501", { statusCode: 501, message: "Not Implemented" }],
  ["HTTP_502", { statusCode: 502, message: "Bad Gateway" }],
  ["HTTP_503", { statusCode: 503, message: "Service Unavailable" }],
  ["HTTP_504", { statusCode: 504, message: "Gateway Timeout" }],
  ["HTTP_200", { statusCode: 200, message: "Success", data: {} }],
  ["HTTP_201", { statusCode: 201, message: "Created", data: {} }],
  ["HTTP_202", { statusCode: 202, message: "Accepted", data: {} }],
  ["HTTP_204", { statusCode: 204, message: "No Content", data: {} }],
  ["HTTp_205", { statusCode: 205, message: "Reset Content", data: {} }],
  ["HTTP_206", { statusCode: 206, message: "Partial Content", data: {} }],
  ["HTTP_208", { statusCode: 208, message: "Already Reported", data: {} }],
  ["ERROR", { statusCode: 500, message: '"{CODE}" Not found in default ApiDefaultResponse', data: {} }]
]);
var ApiDefaultResponse = class {
  static get(key) {
    var _a;
    const error = JSON.parse(JSON.stringify(ApiResponseMap.map.get("ERROR"))).message.replace("{CODE}", key);
    const get = (_a = ApiResponseMap.map.get(key)) != null ? _a : error;
    return get;
  }
};

// src/api_fetcher/api_fetcher.ts
var ApiFetcher = class {
  constructor(method) {
    this.headers = new Headers({
      "author": "William BASTARD",
      "content-type": "application/json"
    });
    this.method = method;
  }
  fetch(_apiFetcherOptions) {
    return __async(this, null, function* () {
      const response = yield fetch(`${this.getTarget()}`, _apiFetcherOptions);
      const _ms_response = yield response.json();
      return _ms_response != null ? _ms_response : {};
    });
  }
  getHeader(headerKey) {
    return this.headers.get(headerKey);
  }
  setHeader(headerKey, headerValue) {
    this.headers.set(headerKey, headerValue);
  }
  setHeaderObject(headerObjectOptions) {
    Object.assign(this.headers, headerObjectOptions);
  }
  setMethod(method) {
    this.method = method;
  }
  setBody(body) {
    this.body = JSON.stringify(body);
  }
  getTarget() {
    return this.getHeader("ms-target-protocol") + "://" + this.getHeader("ms-target-host") + "/" + this.getHeader("ms-target-service") + "/" + this.getHeader("ms-target-endpoint");
  }
};

// src/index.ts
var src_default = { ApiConstructor, ApiFetcher, ApiDefaultResponse };
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map