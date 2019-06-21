import { RequestHandler } from "express";
import { Combiner } from "./Combiner";
import { KwicRequestHandler } from "./KwicRequestHandler";

// middleware for the combiner
export const apiCombiner:KwicRequestHandler = (req, res, next) => {
    // get the shifted results
    let stringToCombine = req.ShiftedString; 
    const stringCombiner:Combiner = new Combiner();
    let combinedString:string[][] = [];
    let combinedResults:string[][] = [];

    // if not undefined the combine the shift results back to lines
    if(typeof(stringToCombine) != "undefined") {
        combinedString = stringCombiner.combineResults(stringToCombine);
        combinedResults = stringCombiner.combineResults(stringToCombine);
        
    }

    if(combinedString.length) {
        req.CombinedString = combinedString;
        req.CombinedResults = combinedResults;
        next(); 
    }
    else {
        next(
            new Error("There was no String to combine. Please add input."
        ));
    }
    
}
