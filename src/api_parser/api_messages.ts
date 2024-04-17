import ResponseInterface from "./api_interface";
export abstract class ApiResponseMap {
    static map: Map<string, Object> = new Map([
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
        ["ERROR", { statusCode: 500, message: "\"{CODE}\" Not found in default ApiDefaultResponse", data: {} }],
    ])
}
export default abstract class messages implements ResponseInterface {
    statusCode!: number;
    message!: string;
    token?: string | undefined;
    data?: undefined | any;
    details?: unknown;


    static use(key: string): ResponseInterface {
        const error = JSON.parse(JSON.stringify(ApiResponseMap.map.get("ERROR")!)).message.replace("{CODE}", key);
        const get = ApiResponseMap.map.get(key) ?? error;
        return get as ResponseInterface;
    }
}