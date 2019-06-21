"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineStorage = (req, res, next) => {
    const lineStrg = new LineStorage();
    const linesToStore = req.body.string_To_Shift;
    if (Array.isArray(linesToStore) && linesToStore.length) {
        lineStrg.store_Lines(linesToStore);
        next();
    }
    else
        next(new Error("There was no String to Store. Please add input."));
};
class LineStorage {
    constructor() {
        this._lines = [];
    }
    /****************
     *    methods   *
     ****************/
    store_Lines(linesToStore) {
        this._lines = linesToStore;
    }
    // changes a character in the storage
    setChar(lineNumber, wordNumber, charNumber, charToAdd) {
        // get line to chage
        let lines = this._lines[lineNumber][wordNumber];
        // can't replace character by index in javascript
        // have to build new string out of substring and new character
        this._lines[lineNumber][wordNumber] =
            lines.substring(0, charNumber - 1) +
                charToAdd +
                lines.substring(charNumber + 1, lines.length - 1);
    }
    // retrieve a character
    char(lineNumber, wordNumber, charNumber) {
        return this._lines[lineNumber][wordNumber][charNumber];
    }
    // add a character
    addchar(lineNumber, wordNumber, charToAdd) {
        this._lines[lineNumber][wordNumber] += charToAdd;
    }
    // get the number of lines
    lines() {
        return this._lines.length;
    }
    // get the number of words
    word(lineNumber) {
        return this._lines[lineNumber].length;
    }
    getLines() {
        return this._lines;
    }
}
exports.LineStorage = LineStorage;
