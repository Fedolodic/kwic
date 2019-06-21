"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
// middleware for parsing lines
exports.apiParser = (req, res, next) => {
    const input = req.body.string_To_Shift;
    const parsedString = parseInput(new Parser_1.Parser(), input);
    if (parsedString) {
        req.ParsedString = parsedString;
        next();
    }
    else {
        next(new Error("There was no String to Parse. Please add input."));
    }
};
const parseInput = (inputParser, input) => {
    return inputParser.parse(input);
};
