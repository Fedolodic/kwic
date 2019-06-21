"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Combiner_1 = require("./Combiner");
// middleware for the combiner
exports.apiCombiner = (req, res, next) => {
    // get the shifted results
    let stringToCombine = req.ShiftedString;
    const stringCombiner = new Combiner_1.Combiner();
    let combinedString = [];
    let combinedResults = [];
    // if not undefined the combine the shift results back to lines
    if (typeof (stringToCombine) != "undefined") {
        combinedString = stringCombiner.combineResults(stringToCombine);
        combinedResults = stringCombiner.combineResults(stringToCombine);
    }
    if (combinedString.length) {
        req.CombinedString = combinedString;
        req.CombinedResults = combinedResults;
        next();
    }
    else {
        next(new Error("There was no String to combine. Please add input."));
    }
};
