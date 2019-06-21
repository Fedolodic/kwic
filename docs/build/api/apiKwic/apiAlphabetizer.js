"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Alphabetizer_1 = require("./Alphabetizer");
// middleware for the sorter
exports.apiAlphabetizer = (req, res, next) => {
    // get the combined string
    let stringsToSort = req.CombinedString;
    // if content then sort the string and send back to user
    if (stringsToSort) {
        let sortedStrings = sortResults(new Alphabetizer_1.Alphabetizer(), stringsToSort, ">");
        res.json({
            cyclicallyShifted: req.CombinedResults,
            alphabeticallyShifted: sortedStrings
        });
    }
};
const sortResults = (stringSorter, shiftResults, sortType) => {
    let sortResults = [];
    if (Array.isArray(shiftResults) && shiftResults.length) {
        // if sorting in ascending order
        if (sortType === ">")
            // for each result array sort the lines
            for (let i = 0; i < shiftResults.length; i++) {
                let lines = shiftResults[i];
                // ascending order quick sort
                sortResults.push(stringSorter.lexicographicQuickSort(lines, 0, lines.length - 1));
            }
        return sortResults;
    }
    return [];
};
