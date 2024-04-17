"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  call: () => call,
  messages: () => messages,
  parser: () => parser
});
module.exports = __toCommonJS(src_exports);

// src/api_parser/api_parser.ts
var parser = class {
  constructor(_response) {
    this._response = _response;
    return this;
  }
  setResponse(_responseAPI) {
    this._responseAPI = _responseAPI;
    return this;
  }
  sendResponse() {
    this._response.set("X-Powered-By", "Les Ripeurs server");
    return this._response.status(this._responseAPI.statusCode).json(this._responseAPI);
  }
};

// src/api_parser/api_messages.ts
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
var messages = class {
  static use(key) {
    var _a;
    const error = JSON.parse(JSON.stringify(ApiResponseMap.map.get("ERROR"))).message.replace("{CODE}", key);
    const get = (_a = ApiResponseMap.map.get(key)) != null ? _a : error;
    return get;
  }
};

// src/api_fetcher/api_fetcher.ts
var call = class {
  constructor(_request, _response, _mstarget, _msendpoint, _msport) {
    this._headers = new Headers();
    this._options = {};
    this._data = false;
    this._session = false;
    this._status = 500;
    this._isOK = false;
    this._callResponse = /* @__PURE__ */ new Map();
    this._request = _request;
    this._response = _response;
    this.initHeader(_mstarget, _msendpoint, _msport);
  }
  fetch() {
    return __async(this, null, function* () {
      var _a, _b;
      this.getFetchOptions();
      try {
        const responsePromise = yield fetch(`${this.getTarget()}`, this._options);
        const _ms_response = yield responsePromise;
        const _ms_response_json = yield responsePromise.json();
        const _ms_headers = yield responsePromise.headers;
        const _ms_user_data = (_a = _ms_response_json.data) != null ? _a : false;
        const _ms_user_session = (_b = _ms_user_data.session) != null ? _b : false;
        this.setIsOK(_ms_response.ok);
        this.setStatus(_ms_response.status);
        this.setcallResponse(_ms_response_json);
        this.setcallHeaders(_ms_headers);
        this.setSession(_ms_user_session);
        this.setData(_ms_user_data);
      } catch (UncaughtException) {
        let error = messages.use("HTTP_500");
        error.details = UncaughtException;
        this.setIsOK(false);
        this.setStatus(500);
        this.setcallResponse(error);
        this.setSession(false);
        this.setData(false);
      }
      return this;
    });
  }
  setStatus(_status) {
    this._status = _status;
  }
  setIsOK(_isOK) {
    this._isOK = _isOK;
  }
  setSession(_session) {
    this._session = _session;
  }
  setcallHeaders(_callHeaders) {
    const fetchHeaders = {};
    for (const [_headerKey, _headerValue] of _callHeaders.entries()) {
      fetchHeaders[_headerKey] = _headerValue;
    }
    for (const [_headerKey, _headerValue] of Object.entries(fetchHeaders)) {
      this._response.set(this.formatKeyName(_headerKey), _headerValue);
    }
    this._callHeaders = _callHeaders;
  }
  setcallResponse(_callResponse) {
    this._callResponse = _callResponse;
  }
  setData(_data) {
    this._data = _data;
  }
  setHeaderKey(_headerKey, _headerValue) {
    this._headers.set(this.formatKeyName(_headerKey), _headerValue);
  }
  getHeaderKey(_headerKey) {
    const _returnHeader = this._headers.get(this.formatKeyName(_headerKey));
    return _returnHeader;
  }
  getToken() {
    var _a;
    return (_a = this._request.get("Authorization")) != null ? _a : "";
  }
  getOrigin() {
    var _a;
    return (_a = this._request.get("Origin")) != null ? _a : "";
  }
  getFetchOptions() {
    this.initFetchOptions();
    return this._options;
  }
  getTarget() {
    return this.getHeaderKey("ms-target-protocol") + "://" + this.getHeaderKey("ms-target-service") + "." + this.getHeaderKey("ms-target-host") + ":" + this.getHeaderKey("ms-target-port") + "/" + this.getHeaderKey("ms-target-service") + "/" + this.getHeaderKey("ms-target-endpoint");
  }
  formatKeyName(_headerKey) {
    _headerKey = _headerKey.toLowerCase();
    _headerKey = _headerKey.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("-");
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
  initHeader(_mstarget, _msendpoint, _msport) {
    this.setHeaderKey("origin", this.getOrigin());
    this.setHeaderKey("authorization", this.getToken());
    this.setHeaderKey("credentials", "include");
    this.setHeaderKey("author", "William BASTARD");
    this.setHeaderKey("content-type", "application/json");
    this.setHeaderKey("accept", "application/json");
    this.setHeaderKey("ms-user-method", this._request.method);
    this.setHeaderKey("ms-target-service", _mstarget);
    this.setHeaderKey("ms-target-protocol", "http");
    this.setHeaderKey("ms-target-host", "service.riptest");
    this.setHeaderKey("ms-target-port", _msport);
    this.setHeaderKey("ms-target-endpoint", _msendpoint);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  call,
  messages,
  parser
});
//# sourceMappingURL=index.js.map