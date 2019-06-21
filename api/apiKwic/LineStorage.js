"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineStorage = function (req, res, next) {
    var lineStrg = new LineStorage();
    var linesToStore = req.body.string_To_Shift;
    if (Array.isArray(linesToStore) && linesToStore.length) {
        lineStrg.store_Lines(linesToStore);
        next();
    }
    else
        next(new Error("There was no String to Store. Please add input."));
};
var LineStorage = /** @class */ (function () {
    function LineStorage() {
        this._lines = [];
    }
    /****************
     *    methods   *
     ****************/
    LineStorage.prototype.store_Lines = function (linesToStore) {
        this._lines = linesToStore;
    };
    // changes a character in the storage
    LineStorage.prototype.setChar = function (lineNumber, wordNumber, charNumber, charToAdd) {
        // get line to chage
        var lines = this._lines[lineNumber][wordNumber];
        // can't replace character by index in javascript
        // have to build new string out of substring and new character
        this._lines[lineNumber][wordNumber] =
            lines.substring(0, charNumber - 1) +
                charToAdd +
                lines.substring(charNumber + 1, lines.length - 1);
    };
    // retrieve a character
    LineStorage.prototype.char = function (lineNumber, wordNumber, charNumber) {
        return this._lines[lineNumber][wordNumber][charNumber];
    };
    // add a character
    LineStorage.prototype.addchar = function (lineNumber, wordNumber, charToAdd) {
        this._lines[lineNumber][wordNumber] += charToAdd;
    };
    // get the number of lines
    LineStorage.prototype.lines = function () {
        return this._lines.length;
    };
    // get the number of words
    LineStorage.prototype.word = function (lineNumber) {
        return this._lines[lineNumber].length;
    };
    LineStorage.prototype.getLines = function () {
        return this._lines;
    };
    return LineStorage;
}());
exports.LineStorage = LineStorage;
