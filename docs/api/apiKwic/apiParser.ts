import { RequestHandler } from "express";
import { Parser } from "./Parser";
import { KwicRequestHandler } from "./KwicRequestHandler";

// middleware for parsing lines
export const apiParser:KwicRequestHandler = (req, res, next) => {
    const input:string = req.body.string_To_Shift;
    const parsedString = parseInput(new Parser(), input);

    if(parsedString) {
        req.ParsedString = parsedString;
        next();
    }
    else {
        next(
            new Error("There was no String to Parse. Please add input."
        ));
    }

}

const parseInput = (inputParser:Parser, input:string) => {
    return inputParser.parse(input);
}
