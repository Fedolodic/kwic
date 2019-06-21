import { Request, Response, NextFunction} from "express";

export interface KwicRequest extends Request {
    ParsedString?:string[][]
    StoredString?:string[][]
    ShiftedString?:string[][][]
    CombinedString?:string[][]
    CombinedResults?:string[][]
}

export interface KwicResponse extends Response {

}

export type KwicRequestHandler = (req:KwicRequest, res:KwicResponse, next:NextFunction) => any;