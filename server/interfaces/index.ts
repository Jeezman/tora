import { ValidationError } from "express-validator";
import { DB } from "./Db";
import { request, Request } from "express";
import { QuerystringParser } from "formidable/parsers";
export interface DataResponse {
    msg: string;
    data: any;
}
export interface ErrorResponse {
    msg: string;
}
export interface ErrorValidationResponse {
    msg: string;
    errors: ValidationError[];
}

export interface RequestUser extends Request {
    user: DB.User;
}
