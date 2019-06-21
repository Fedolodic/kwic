"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Alphabetizer_1 = require("./Alphabetizer");
const Combiner_1 = require("./Combiner");
const CyclicShifter_1 = require("./CyclicShifter");
const LineStorage_1 = require("./LineStorage");
const Parser_1 = require("./Parser");
// combines the middleware into a more master controller style
exports.apiKwic = (req, res, next) => {
    const input = req.body.string_To_Shift;
    const inputParser = new Parser_1.Parser();
    let parsedString = inputParser.parse(input);
    if (parsedString === [])
        next(new Error("There was no String to Parse. Please add input."));
    const lineStrg = new LineStorage_1.LineStorage();
    const linesToStore = parsedString;
    let stringToShift = [];
    if (linesToStore.length) {
        lineStrg.store_Lines(linesToStore);
        stringToShift = linesToStore;
    }
    else
        next(new Error("There was no String to Store. Please add input."));
    const stringShifter = new CyclicShifter_1.CyclicShifter();
    let shiftedString = [];
    if (typeof (stringToShift) != "undefined")
        shiftedString = stringShifter.setupAndShift(stringToShift);
    if (shiftedString === [])
        next(new Error("There was no String to shift. Please add input."));
    let stringToCombine = shiftedString;
    const stringCombiner = new Combiner_1.Combiner();
    let combinedString = [];
    if (typeof (stringToCombine) != "undefined")
        combinedString = stringCombiner.combineResults(stringToCombine);
    if (combinedString === [])
        next(new Error("There was no String to combine. Please add input."));
    let stringsToSort = combinedString;
    if (stringsToSort) {
        const stringSorter = new Alphabetizer_1.Alphabetizer();
        let sortedStrings = stringSorter.sortResults(stringsToSort, ">");
        res.json(sortedStrings);
    }
};
