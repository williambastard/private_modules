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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/api_parser/api_parser.ts
var api_parser_exports = {};
__export(api_parser_exports, {
  Constructor: () => Constructor,
  default: () => api_parser_default
});

// src/api_parser/api_constantes.ts
var api_constantes_exports = {};
__export(api_constantes_exports, {
  _ACCEPTED: () => _ACCEPTED,
  _ALREADY_REPORTED: () => _ALREADY_REPORTED,
  _CREATED: () => _CREATED,
  _HTTP_400: () => _HTTP_400,
  _HTTP_401: () => _HTTP_401,
  _HTTP_402: () => _HTTP_402,
  _HTTP_403: () => _HTTP_403,
  _HTTP_404: () => _HTTP_404,
  _HTTP_405: () => _HTTP_405,
  _HTTP_406: () => _HTTP_406,
  _HTTP_407: () => _HTTP_407,
  _HTTP_498: () => _HTTP_498,
  _HTTP_500: () => _HTTP_500,
  _HTTP_501: () => _HTTP_501,
  _HTTP_502: () => _HTTP_502,
  _HTTP_503: () => _HTTP_503,
  _HTTP_504: () => _HTTP_504,
  _NO_CONTENT: () => _NO_CONTENT,
  _OK: () => _OK,
  _PARTIAL_CONTENT: () => _PARTIAL_CONTENT,
  _RESET_CONTENT: () => _RESET_CONTENT
});
var _HTTP_400 = { statusCode: 400, message: "Bad Request" };
var _HTTP_401 = { statusCode: 401, message: "Unauthorized" };
var _HTTP_402 = { statusCode: 402, message: "Payment Required" };
var _HTTP_403 = { statusCode: 403, message: "Forbidden" };
var _HTTP_404 = { statusCode: 404, message: "Not Found" };
var _HTTP_405 = { statusCode: 405, message: "Not Allowed" };
var _HTTP_406 = { statusCode: 406, message: "Not Acceptable" };
var _HTTP_407 = { statusCode: 407, message: "Proxy Authentication required" };
var _HTTP_498 = { statusCode: 498, message: "Token expired / invalid" };
var _HTTP_500 = { statusCode: 500, message: "Internal Server Error" };
var _HTTP_501 = { statusCode: 501, message: "Not Implemented" };
var _HTTP_502 = { statusCode: 502, message: "Bad Gateway" };
var _HTTP_503 = { statusCode: 503, message: "Service Unavailable" };
var _HTTP_504 = { statusCode: 504, message: "Gateway Timeout" };
var _OK = { statusCode: 200, message: "Success", data: {} };
var _CREATED = { statusCode: 201, message: "Created", data: {} };
var _ACCEPTED = { statusCode: 202, message: "Accepted", data: {} };
var _NO_CONTENT = { statusCode: 204, message: "No Content", data: {} };
var _RESET_CONTENT = { statusCode: 205, message: "Reset Content", data: {} };
var _PARTIAL_CONTENT = { statusCode: 206, message: "Partial Content", data: {} };
var _ALREADY_REPORTED = { statusCode: 208, message: "Already Reported", data: {} };

// src/api_parser/api_parser.ts
var Constructor = class {
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
var api_parser_default = api_constantes_exports;

// src/index.ts
var src_default = api_parser_exports;
//# sourceMappingURL=index.js.map