"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CyclicShifter_1 = require("./CyclicShifter");
// shifter middleware 
exports.apiCyclicShifter = function (req, res, next) {
    var stringToShift = req.StoredString; // get string to shift
    var shiftedString = [];
    // if not undefined the shift and send to next piece of middleware
    if (typeof (stringToShift) != "undefined")
        shiftedString = cyclicShift(new CyclicShifter_1.CyclicShifter(), stringToShift);
    if (shiftedString) {
        req.ShiftedString = shiftedString;
        next();
    }
    else
        next(new Error("There was no String to shift. Please add input."));
};
var cyclicShift = function (stringShifter, stringToShift) {
    return stringShifter.setupAndShift(stringToShift);
};
