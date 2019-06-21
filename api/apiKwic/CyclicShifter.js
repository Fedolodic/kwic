"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queue_typescript_1 = require("queue-typescript");
exports.cyclicShifter = function (req, res, next) {
    var stringToShift = req.body.string_To_Shift;
    var stringShifter = new CyclicShifter();
    var shiftedString = stringShifter.setupAndShift(stringToShift);
    if (shiftedString) {
        req.body.string_To_Shift = shiftedString;
        next();
    }
    else
        next(new Error("There was no String to shift. Please add input."));
};
var CyclicShifter = /** @class */ (function () {
    /****************
     *    methods   *
     ****************/
    function CyclicShifter() {
        /* this is used to remove from front
           of line and add to back of line
           each queue in the array is for
           the words of each line */
        this._lines = [];
    }
    // calls the setup and shift functions
    CyclicShifter.prototype.setupAndShift = function (lines) {
        // set up the queue
        if (this.setup(lines)) {
            // cyclical shift
            var shiftResults = this.shift();
            if (shiftResults != [])
                return shiftResults;
            return [];
        }
        return [];
    };
    // setup the queue with the lines
    CyclicShifter.prototype.setup = function (lines) {
        // make sure there is content
        if (lines) {
            // add each word of each line to the queue
            for (var i = 0; i < lines.length; i++) {
                this._lines[i] = new queue_typescript_1.Queue();
                for (var j = 0; j < lines[i].length; j++)
                    this._lines[i].enqueue(lines[i][j]);
            }
            if (this._lines)
                return true;
            return false;
        }
        return false;
    };
    // cyclical shift
    CyclicShifter.prototype.shift = function () {
        // holds the results for each line
        var shiftResults = [];
        // make sure there is content
        if (this._lines) {
            // shift happens here
            for (var i = 0; i < this._lines.length; i++) {
                var lineToShift = this._lines[i];
                shiftResults[i] = [];
                /* store the current word order as a result
                   the take remove first word and add it to
                   the queue */
                for (var j = 0; j < lineToShift.length; j++) {
                    shiftResults[i][j] = lineToShift.toArray();
                    var wordToShift = lineToShift.dequeue();
                    lineToShift.enqueue(wordToShift);
                }
            }
            if (shiftResults)
                return shiftResults;
            return [];
        }
        return [];
    };
    return CyclicShifter;
}());
exports.CyclicShifter = CyclicShifter;
