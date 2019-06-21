"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = (req, res, next) => {
    const input = req.body.string_To_Shift;
    const inputParser = new Parser();
    const parsedString = inputParser.parse(input);
    if (parsedString) {
        req.body.string_To_Shift = parsedString;
        next();
    }
    else {
        next(new Error("There was no String to Parse. Please add input."));
    }
};
class Parser {
    /****************
     *    methods   *
     ****************/
    // parses the string into an array of words for
    // shifting
    /****************
     *    methods   *
     ****************/
    // parses the string into an array of words for
    // shifting
    parse(userInput) {
        // make sure there is userinput
        let parsedLines = [];
        if (typeof (userInput) != "undefined" && userInput.length) {
            let current = 0, firstChar = 0;
            // parse each line then parse each line by words
            for (; current < userInput.length; current++) {
                // line parse
                if (userInput[current] === "$") {
                    parsedLines.push(this._getSubString(userInput, firstChar, current - 1));
                    firstChar = current + 1;
                }
            }
            if (firstChar != current)
                parsedLines.push(this._getSubString(userInput, firstChar, current));
            // if there was content return
            if (parsedLines.length) {
                return parsedLines;
            }
            return [];
        }
        return [];
    }
    _getSubString(str, firstChar, currentChar) {
        let newLine = str.substring(firstChar, currentChar + 1);
        // word parse
        return newLine.split(" ");
    }
}
exports.Parser = Parser;
;
