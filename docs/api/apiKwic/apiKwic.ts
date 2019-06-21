import { KwicRequestHandler } from "./KwicRequestHandler";
import { Alphabetizer } from "./Alphabetizer";
import { Combiner } from "./Combiner";
import { CyclicShifter } from "./CyclicShifter";
import { LineStorage } from "./LineStorage";
import { Parser } from "./Parser";

// combines the middleware into a more master controller style
export const apiKwic:KwicRequestHandler = (req, res, next) => {
    const input:string = req.body.string_To_Shift;
    const inputParser:Parser = new Parser();
    let parsedString:string[][] = inputParser.parse(input);

    if(parsedString === []) 
        next(
            new Error("There was no String to Parse. Please add input."
        ));
    
        const lineStrg:LineStorage = new LineStorage();
        const linesToStore:string[][] = parsedString;
        let stringToShift:string[][] = [];

        if(linesToStore.length) {
            lineStrg.store_Lines(linesToStore);
            stringToShift = linesToStore;
        }
        else
            next(
                new Error("There was no String to Store. Please add input."
            ));
        
        const stringShifter:CyclicShifter = new CyclicShifter();
        let shiftedString:string[][][] = [];
    
        if(typeof(stringToShift) != "undefined")
            shiftedString = stringShifter.setupAndShift(stringToShift);
    
        if(shiftedString === [])
            next(
                new Error("There was no String to shift. Please add input."
            ));
        
        let stringToCombine = shiftedString;
        const stringCombiner:Combiner = new Combiner();  
        let combinedString:string[][] = [];
    
        if(typeof(stringToCombine) != "undefined")
            combinedString = stringCombiner.combineResults(stringToCombine);
        
        if(combinedString === [])
            next(
                new Error("There was no String to combine. Please add input."
            ));
        
        let stringsToSort = combinedString;

        if(stringsToSort) {
            const stringSorter:Alphabetizer = new Alphabetizer(); 
            let sortedStrings:string[][] = 
                stringSorter.sortResults(stringsToSort, ">");
                
            res.json(sortedStrings);
        }
};