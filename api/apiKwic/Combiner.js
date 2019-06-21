"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combiner = function (req, res, next) {
    var stringToCombine = req.body.string_To_Shift;
    var stringCombiner = new Combiner();
    var combinedString = stringCombiner.combineResults(stringToCombine);
    if (combinedString != []) {
        req.body.string_To_Shift = combinedString;
        next();
    }
    else {
        next(new Error("There was no String to combine. Please add input."));
    }
};
var Combiner = /** @class */ (function () {
    function Combiner() {
    }
    /****************
     *    methods   *
     ****************/
    // combines lines back together
    Combiner.prototype.combineResults = function (parsedString) {
        var combinedString = [];
        // make sure there is content
        if (parsedString && parsedString.length) {
            var combinedLine = [];
            // combining
            for (var i = 0; i < parsedString.length; i++)
                combinedLine[i] = this.combineLineGroups(parsedString[i]);
            // if content return to the user
            if (combinedString)
                return combinedLine;
            return [];
        }
        return [];
    };
    Combiner.prototype.combineLineGroups = function (parsedLineGroups) {
        if (parsedLineGroups && parsedLineGroups.length) {
            var combinedLineGroups = [];
            for (var i = 0; i < parsedLineGroups.length; i++)
                combinedLineGroups[i] = this.combineLine(parsedLineGroups[i]);
            if (combinedLineGroups && combinedLineGroups.length)
                return combinedLineGroups;
            return [];
        }
        return [];
    };
    Combiner.prototype.combineLine = function (parsedLine) {
        var combinedLine = "";
        if (parsedLine && parsedLine.length) {
            var lastWord = parsedLine.length - 1;
            for (var i = 0; i < lastWord; i++)
                combinedLine += (parsedLine[i] + " ");
            combinedLine += parsedLine[lastWord];
            if (combinedLine)
                return combinedLine;
            return "";
        }
        return "";
    };
    return Combiner;
}());
exports.Combiner = Combiner;
