import { RequestHandler } from "express";
import { Alphabetizer } from "./Alphabetizer";
import { KwicRequestHandler } from "./KwicRequestHandler";

// middleware for the sorter
export const apiAlphabetizer:KwicRequestHandler = (req, res, next) => {
    // get the combined string
    let stringsToSort = req.CombinedString;

    
    // if content then sort the string and send back to user
    if(stringsToSort) {
        let sortedStrings:string[][] = 
            sortResults(new Alphabetizer(), stringsToSort, ">");
            
        res.json({
            cyclicallyShifted: req.CombinedResults,
            alphabeticallyShifted: sortedStrings});
    }
}

const sortResults = (stringSorter:Alphabetizer, shiftResults:string[][], sortType:string) => {
    let sortResults:string[][] = [];

    if(Array.isArray(shiftResults) && shiftResults.length) {
    // if sorting in ascending order

    if(sortType === ">")
        // for each result array sort the lines
        for(let i:number = 0; i < shiftResults.length; i++) {
            let lines = shiftResults[i];
            // ascending order quick sort
            sortResults.push(
                stringSorter.lexicographicQuickSort(lines, 0, lines.length - 1));
        }

    return sortResults;
    }

    return [];
}