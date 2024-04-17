import { ErrorRequestHandler } from "express";

export default interface ApiInterface {
    statusCode: number,
    message: string,
    token?: string,
    data?: undefined | any,
    details?: Error | ErrorCallback | ErrorEvent | ErrorRequestHandler | unknown
}
export type {
    ApiInterface
}