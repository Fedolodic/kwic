"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alphabetizer_1 = require("./Alphabetizer");
var Combiner_1 = require("./Combiner");
var CyclicShifter_1 = require("./CyclicShifter");
var LineStorage_1 = require("./LineStorage");
var Parser_1 = require("./Parser");
// combines the middleware into a more master controller style
exports.apiKwic = function (req, res, next) {
    var input = req.body.string_To_Shift;
    var inputParser = new Parser_1.Parser();
    var parsedString = inputParser.parse(input);
    if (parsedString === [])
        next(new Error("There was no String to Parse. Please add input."));
    var lineStrg = new LineStorage_1.LineStorage();
    var linesToStore = parsedString;
    var stringToShift = [];
    if (linesToStore.length) {
        lineStrg.store_Lines(linesToStore);
        stringToShift = linesToStore;
    }
    else
        next(new Error("There was no String to Store. Please add input."));
    var stringShifter = new CyclicShifter_1.CyclicShifter();
    var shiftedString = [];
    if (typeof (stringToShift) != "undefined")
        shiftedString = stringShifter.setupAndShift(stringToShift);
    if (shiftedString === [])
        next(new Error("There was no String to shift. Please add input."));
    var stringToCombine = shiftedString;
    var stringCombiner = new Combiner_1.Combiner();
    var combinedString = [];
    if (typeof (stringToCombine) != "undefined")
        combinedString = stringCombiner.combineResults(stringToCombine);
    if (combinedString === [])
        next(new Error("There was no String to combine. Please add input."));
    var stringsToSort = combinedString;
    if (stringsToSort) {
        var stringSorter = new Alphabetizer_1.Alphabetizer();
        var sortedStrings = stringSorter.sortResults(stringsToSort, ">");
        res.json(sortedStrings);
    }
};
