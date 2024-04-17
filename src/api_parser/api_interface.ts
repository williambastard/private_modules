import { ErrorRequestHandler } from "express";

export default interface ResponseInterface {
    statusCode: number,
    message: string,
    token?: string,
    data?: undefined | any,
    details?: Error | ErrorCallback | ErrorEvent | ErrorRequestHandler | unknown
}