import { RequestHandler } from "express";
import { CyclicShifter } from "./CyclicShifter";
import { KwicRequestHandler } from "./KwicRequestHandler";

// shifter middleware 
export const apiCyclicShifter:KwicRequestHandler = (req, res, next) => {
    let stringToShift = req.StoredString; // get string to shift
    let shiftedString:string[][][] = [];

    // if not undefined the shift and send to next piece of middleware
    if(typeof(stringToShift) != "undefined")
        shiftedString = cyclicShift(new CyclicShifter(), stringToShift);

    if(shiftedString) {
        req.ShiftedString = shiftedString;
        next();
    }
    else
        next(
            new Error("There was no String to shift. Please add input."
        ));
}

const cyclicShift = 
    (stringShifter:CyclicShifter, stringToShift:string[][]) => {
        return stringShifter.setupAndShift(stringToShift);
}