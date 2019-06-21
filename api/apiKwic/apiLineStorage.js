"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LineStorage_1 = require("./LineStorage");
// middleware for storing lines
exports.apiLineStorage = function (req, res, next) {
    var lineStrg = new LineStorage_1.LineStorage();
    var linesToStore = req.ParsedString;
    if (Array.isArray(linesToStore) && linesToStore.length) {
        lineStrg.store_Lines(linesToStore);
        req.StoredString = linesToStore;
        next();
    }
    else
        next(new Error("There was no String to Store. Please add input."));
};
