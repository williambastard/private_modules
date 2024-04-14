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
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

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
var ApiJSON = class {
  static get(key) {
    var _a;
    const error = JSON.parse(JSON.stringify(ApiResponseMap.map.get("ERROR"))).message.replace("{CODE}", key);
    const get = (_a = ApiResponseMap.map.get(key)) != null ? _a : error;
    return get;
  }
};

// src/api_fetcher/api_fetcher.ts
var Call = class {
  constructor(_request, _mstarget) {
    this._headers = new Headers();
    this._options = {};
    this._data = false;
    this._session = false;
    this._status = 500;
    this._isOK = false;
    this._callresponse = /* @__PURE__ */ new Map();
    this._request = _request;
    this.initHeader(_request, _mstarget);
  }
  fetch() {
    return __async(this, null, function* () {
      var _a, _b;
      const response = yield fetch(`${this.getTarget()}`, this.getFetchOptions());
      const _ms_response = yield response.json();
      const _ms_user_data = (_a = _ms_response.data) != null ? _a : false;
      const _ms_user_session = (_b = _ms_user_data.session) != null ? _b : false;
      this.setIsOK(response.ok);
      this.setStatus(response.status);
      this.setCallResponse(_ms_response);
      this.setSession(_ms_user_session);
      this.setData(_ms_user_data);
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
  setCallResponse(_callresponse) {
    this._callresponse = _callresponse;
  }
  setData(_data) {
    this._data = _data;
  }
  setFetchOption(_fetchOptionObject) {
    Object.assign(this._options, _fetchOptionObject);
  }
  setHeaderKey(headerKey, headerValue) {
    this._headers.set(headerKey, headerValue);
  }
  getHeaderKey(headerKey) {
    return this._headers.get(headerKey);
  }
  getToken() {
    var _a;
    return (_a = this._request.get("Token")) != null ? _a : "";
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
    return this.getHeaderKey("ms-target-protocol") + "://" + this.getHeaderKey("ms-target-service") + "." + this.getHeaderKey("ms-target-host") + "/" + this.getHeaderKey("ms-target-service") + "/" + this.getHeaderKey("ms-target-endpoint");
  }
  initFetchOptions() {
    this.setFetchOption(this._headers);
    this.setFetchOption({ "method": this._request.method });
    this.setFetchOption({ "body": this._request.body });
  }
  initHeader(_request, _target) {
    this.setHeaderKey("Origin", this.getOrigin());
    this.setHeaderKey("Token", this.getToken());
    this.setHeaderKey("Credentials", "include");
    this.setHeaderKey("Author", "William BASTARD");
    this.setHeaderKey("Content-type", "application/json");
    this.setHeaderKey("Accept", "application/json");
    this.setHeaderKey("Ms-user-method", _request.method);
    this.setHeaderKey("Ms-target-service", _target);
    this.setHeaderKey("Ms-target-protocol", "http");
    this.setHeaderKey("Ms-target-host", "service.riptest:8282");
    this.setHeaderKey("Ms-target-endpoint", _request.url.replace("/", ""));
  }
};

// src/index.ts
var src_default = { ApiConstructor, Call, ApiJSON };
//# sourceMappingURL=index.js.map