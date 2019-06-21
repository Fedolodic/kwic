"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alphabetizer_1 = require("./Alphabetizer");
// middleware for the sorter
exports.apiAlphabetizer = function (req, res, next) {
    // get the combined string
    var stringsToSort = req.CombinedString;
    // if content then sort the string and send back to user
    if (stringsToSort) {
        var sortedStrings = sortResults(new Alphabetizer_1.Alphabetizer(), stringsToSort, ">");
        res.json({
            cyclicallyShifted: req.CombinedResults,
            alphabeticallyShifted: sortedStrings
        });
    }
};
var sortResults = function (stringSorter, shiftResults, sortType) {
    var sortResults = [];
    if (Array.isArray(shiftResults) && shiftResults.length) {
        // if sorting in ascending order
        if (sortType === ">")
            // for each result array sort the lines
            for (var i = 0; i < shiftResults.length; i++) {
                var lines = shiftResults[i];
                // ascending order quick sort
                sortResults.push(stringSorter.lexicographicQuickSort(lines, 0, lines.length - 1));
            }
        return sortResults;
    }
    return [];
};
