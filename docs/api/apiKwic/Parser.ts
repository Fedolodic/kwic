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
        
        if(typeof(userInput) != "undefined" && userInput.length) {
            let current:number = 0, firstChar:number = 0;
        
            // parse each line then parse each line by words
            for(;current < userInput.length; current++)
            {
                // line parse
                if(userInput[current] === "$") {
                    parsedLines.push(
                        this._getSubString(userInput, firstChar, current - 1));
                    firstChar = current + 1;
                } 
            }
                
            if(firstChar != current)
                parsedLines.push(
                this._getSubString(userInput, firstChar, current));

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
        str.substring(firstChar, currentChar + 1);
        // word parse
        return newLine.split(" ");
    }
};