import { RequestHandler } from "express";

export const lineStorage:RequestHandler = (req, res, next) => {
    const lineStrg:LineStorage = new LineStorage();
    const linesToStore = req.body.string_To_Shift;

    if(Array.isArray(linesToStore) && linesToStore.length) {
        lineStrg.store_Lines(linesToStore);
        next();
    }
    else
        next(
            new Error("There was no String to Store. Please add input."
        ));
}

export class LineStorage {
    _lines:string[][] = []
   
    /****************
     *    methods   *
     ****************/
    store_Lines(linesToStore:string[][]) {
        this._lines = linesToStore;
    }

    // changes a character in the storage
    setChar(lineNumber:number, wordNumber:number, charNumber:number,
        charToAdd:string) {
        // get line to chage
        let lines:string = this._lines[lineNumber][wordNumber];
        
        // can't replace character by index in javascript
        // have to build new string out of substring and new character
        this._lines[lineNumber][wordNumber] = 
            lines.substring(0, charNumber - 1) + 
            charToAdd + 
            lines.substring(charNumber + 1, lines.length - 1);   
    }

    // retrieve a character
    char(lineNumber:number, wordNumber:number, charNumber:number) {
        return this._lines[lineNumber][wordNumber][charNumber];
    }

    // add a character
    addchar(lineNumber:number, wordNumber:number, charToAdd:string) {
        this._lines[lineNumber][wordNumber] += charToAdd;
    }

    // get the number of lines
    lines() {
        return this._lines.length;
    }

    // get the number of words
    word(lineNumber:number) {
        return this._lines[lineNumber].length;
    }

    getLines() {
        return this._lines;
    }
}