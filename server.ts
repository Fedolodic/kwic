
import express from "express";
import { apiParser as parser} from "./api/apiKwic/apiParser";
import { apiLineStorage as lineStorage} from "./api/apiKwic/apiLineStorage";
import { apiCyclicShifter as cyclicShifter } from "./api/apiKwic/apiCyclicShifter";
import { apiCombiner as combiner} from "./api/apiKwic/apiCombiner";
import { apiAlphabetizer as alphabetizer} from "./api/apiKwic/apiAlphabetizer";
import { apiKwic as Kwic } from "./api/apiKwic/apiKwic";

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
import * as bodyparser from "body-parser";
const jsonParser = bodyparser.json();

app.post("/KWIC", jsonParser, parser, lineStorage, cyclicShifter, combiner, alphabetizer);

// start server and listen to incoming request
app.listen(process.env.PORT || 8091, () => {console.log("Server started...")});