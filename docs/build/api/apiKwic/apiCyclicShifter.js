"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CyclicShifter_1 = require("./CyclicShifter");
// shifter middleware 
exports.apiCyclicShifter = (req, res, next) => {
    let stringToShift = req.StoredString; // get string to shift
    let shiftedString = [];
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
const cyclicShift = (stringShifter, stringToShift) => {
    return stringShifter.setupAndShift(stringToShift);
};
