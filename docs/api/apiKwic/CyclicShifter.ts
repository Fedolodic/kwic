import { Queue } from "queue-typescript";
import { RequestHandler } from "express";

export const cyclicShifter:RequestHandler = (req, res, next) => {
    let stringToShift = req.body.string_To_Shift;
    const stringShifter:CyclicShifter = new CyclicShifter();
    const shiftedString = stringShifter.setupAndShift(stringToShift);

    if(shiftedString) {
        req.body.string_To_Shift = shiftedString;
        next();
    }
    else
        next(
            new Error("There was no String to shift. Please add input."
        ));
}

export class CyclicShifter {
    /* this is used to remove from front
       of line and add to back of line
       each queue in the array is for 
       the words of each line */
    _lines:Queue<string>[] = [];

    /****************
     *    methods   *
     ****************/
    constructor() {
    }
    // calls the setup and shift functions
    setupAndShift(lines:string[][]) {
        // set up the queue
        if(this.setup(lines)) {
            // cyclical shift
            let shiftResults = this.shift();

            if(shiftResults != []) 
                return shiftResults;
            
            return []
        }

        return [];
    }

    // setup the queue with the lines
    setup(lines:string[][]) {
        // make sure there is content
        if(lines)
        {
            // add each word of each line to the queue
            for(let i:number = 0; i < lines.length; i++) {
                this._lines[i] = new Queue<string>();
                
                for(let j:number = 0; j < lines[i].length; j++) 
                    this._lines[i].enqueue(lines[i][j]);
            }
    
            if(this._lines)
                return true;
            
            return false;
        }

        return false;
    }

    // cyclical shift
    shift() {
        // holds the results for each line
        let shiftResults:string[][][] = [];

        // make sure there is content
        if(this._lines) {
            // shift happens here
            for(let i:number = 0; i < this._lines.length; i++) {
                let lineToShift:Queue<string> = this._lines[i];
                shiftResults[i] = [];
                /* store the current word order as a result 
                   the take remove first word and add it to
                   the queue */
                for(let j:number = 0; j < lineToShift.length; j++) {
                    shiftResults[i][j] = lineToShift.toArray();
                    let wordToShift = lineToShift.dequeue();
                    lineToShift.enqueue(wordToShift);
                }
            }

            if(shiftResults)
                return shiftResults;
            
            return [];
        }

        return [];
    }
}