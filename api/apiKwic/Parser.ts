import { RequestHandler } from "express";

export const parser:RequestHandler = (req, res, next) => {
    const input:string = req.body.string_To_Shift;
    const inputParser:Parser = new Parser();
    const parsedString = inputParser.parse(input);

    if(parsedString) {
        req.body.string_To_Shift = parsedString;
        next();
    }
    else {
        next(
            new Error("There was no String to Parse. Please add input."
        ));
    }

}

export class Parser {
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

    parse(userInput:string) {
        // make sure there is userinput
        let parsedLines:string[][] = [];
        console.log("ParsedLines.length:  " + parsedLines.length);
        if(typeof(userInput) != "undefined" && userInput.length) {
            let current:number = 0, firstChar:number = 0;
        
            // parse each line then parse each line by words
            for(;current < userInput.length; current++)
            {
                // line parse
                if(userInput[current] === "$") {
                    parsedLines.push(
                        this._getSubString(userInput, firstChar, current));
                    firstChar = current + 1;
                } 
            }
        
            parsedLines.push(
                this._getSubString(userInput, firstChar, current + 1));
            console.log(parsedLines);
            // if there was content return
            if(parsedLines.length) {
                    return parsedLines;
            } 
            
            return [];
        }

        return [];
    }

    _getSubString(str:string, firstChar:number, currentChar:number) {
        let newLine:string = 
        str.substring(firstChar, currentChar);
        newLine = newLine.trim();
        console.log(newLine);
        // word parse
        return newLine.split(" ");
    }
};