import { RequestHandler } from "express";
import { LineStorage } from "./LineStorage";
import { KwicRequestHandler } from "./KwicRequestHandler";

// middleware for storing lines
export const apiLineStorage:KwicRequestHandler = (req, res, next) => {
    const lineStrg:LineStorage = new LineStorage();
    const linesToStore = req.ParsedString;

    if(Array.isArray(linesToStore) && linesToStore.length) {
        lineStrg.store_Lines(linesToStore);
        req.StoredString = linesToStore;
        next();
    }
    else
        next(
            new Error("There was no String to Store. Please add input."
        ));
}