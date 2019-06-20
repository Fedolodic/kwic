import { RequestHandler } from "express";

export const combiner:RequestHandler = (req, res, next) => {

    let stringToCombine:string[][][] = req.body.string_To_Shift;
    const stringCombiner:Combiner = new Combiner();  
    const combinedString:string[][] = 
        stringCombiner.combineResults(stringToCombine);
    
    if(combinedString != []) {
        req.body.string_To_Shift = combinedString;
        next(); 
    }
    else {
        next(
            new Error("There was no String to combine. Please add input."
        ));
    }
    
}

export class Combiner {
    /****************
     *    methods   *
     ****************/

    // combines lines back together
    combineResults(parsedString:string[][][]) {
        let combinedString:string[][] = [];

        // make sure there is content
        if(parsedString) {
            let combinedLine:string[][] = [];
    
            // combining
            for(let i:number = 0; i < parsedString.length; i++) 
                combinedLine[i] = this.combineLineGroups(parsedString[i]);


            // if content return to the user
            if(combinedString)
                return combinedLine;

            return [];
        }

        return [];
    }

    combineLineGroups(parsedLineGroups:string[][]) { 
        if(parsedLineGroups && parsedLineGroups.length) {
            let combinedLineGroups:string[] = [];

            for(let i:number = 0; i < parsedLineGroups.length; i++) 
                combinedLineGroups[i] =  this.combineLine(parsedLineGroups[i]); 
            
            if(combinedLineGroups && combinedLineGroups.length) 
                return combinedLineGroups;
            
            return [];
        }

        return [];
    }

    combineLine(parsedLine:string[]) {
        let combinedLine = "";

        if(parsedLine && parsedLine.length) {
            let lastWord = parsedLine.length - 1;

            for(let i:number = 0; i < lastWord; i++) 
                combinedLine += (parsedLine[i] + " ");

            combinedLine += parsedLine[lastWord];
            
            if(combinedLine)
                return combinedLine;
            
            return "";
        }

        return "";
    }
}