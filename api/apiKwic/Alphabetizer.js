"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alphabetizer = /** @class */ (function () {
    function Alphabetizer() {
    }
    // this function is for shifting shift results
    Alphabetizer.prototype.sortResults = function (shiftResults, sortType) {
        var sortResults = [];
        if (Array.isArray(shiftResults) && shiftResults.length) {
            // if sorting in ascending order
            if (sortType === ">")
                // for each result array sort the lines
                for (var i = 0; i < shiftResults.length; i++) {
                    var lines = shiftResults[i];
                    // ascending order quick sort
                    sortResults.push(this.lexicographicQuickSort(lines, 0, lines.length - 1));
                }
            return sortResults;
        }
        return [];
    };
    // recursive quick sort
    Alphabetizer.prototype.lexicographicQuickSort = function (lines, low, high) {
        // while low and high are not equal
        if (low < high) {
            // puts greater values to right of pivot (high)
            // puts lesser values on right and returns pivots 
            // new position
            var pivot = this._partion(lines, low, high);
            // sort each side of the pivot
            this.lexicographicQuickSort(lines, low, pivot - 1);
            this.lexicographicQuickSort(lines, pivot + 1, high);
        }
        return lines;
    };
    // high acts as the pivot in this sort
    Alphabetizer.prototype._partion = function (lines, low, high) {
        var pivot = lines[high];
        var index = low - 1;
        /* while lines[j] is <= pivot, we need
           to move the bigger numbers closer to
           the pivot and smaller numbers farther
           from the pivot */
        for (var j = low; j < high; j++) {
            if (lines[j] <= pivot) {
                index++;
                this._swap(lines, index, j);
            }
        }
        // place pivot in the right spot
        index++;
        this._swap(lines, index, high);
        return index;
    };
    // swap elements in an array
    Alphabetizer.prototype._swap = function (lines, element1, element2) {
        var temp = lines[element1];
        lines[element1] = lines[element2];
        lines[element2] = temp;
    };
    return Alphabetizer;
}());
exports.Alphabetizer = Alphabetizer;
;
