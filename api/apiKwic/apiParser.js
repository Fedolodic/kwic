"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
// middleware for parsing lines
exports.apiParser = function (req, res, next) {
    var input = req.body.string_To_Shift;
    var parsedString = parseInput(new Parser_1.Parser(), input);
    if (parsedString) {
        req.ParsedString = parsedString;
        next();
    }
    else {
        next(new Error("There was no String to Parse. Please add input."));
    }
};
var parseInput = function (inputParser, input) {
    return inputParser.parse(input);
};
