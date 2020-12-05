"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var parseRawData = function (rawData) {
    var e_1, _a;
    var fieldParser = /([a-z]{3}):([A-Za-z0-9#]+)/g;
    var documents = [];
    var tmpObj = {};
    for (var i = 0; i < rawData.length; i++) {
        var line = rawData[i].trim();
        if (line.length == 0) {
            documents.push(tmpObj);
            tmpObj = {};
            continue;
        }
        var matches = line.matchAll(fieldParser);
        try {
            for (var matches_1 = (e_1 = void 0, __values(matches)), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
                var match = matches_1_1.value;
                tmpObj[match[1]] = match[2];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (matches_1_1 && !matches_1_1.done && (_a = matches_1.return)) _a.call(matches_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return documents;
};
var areFieldsValid = function (arg) {
    return arg && arg.byr && arg.iyr && arg.eyr && arg.hgt && arg.hcl && arg.ecl && arg.pid;
};
var isDataValid = function (arg) {
    var hclValidator = /^#[0-9a-f]{6}$/g;
    var validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    var pidValidator = /^[0-9]{9}$/g;
    if (areFieldsValid(arg)) {
        var byr = parseInt(arg.byr);
        var iyr = parseInt(arg.iyr);
        var eyr = parseInt(arg.eyr);
        var heightValue = parseInt(arg.hgt.substring(0, arg.hgt.length - 2));
        var heightUnits = arg.hgt.substring(arg.hgt.length - 2);
        var heightUnitsValid = heightUnits == "cm" || heightUnits == "in";
        var heightValueValid = typeof heightValue === 'number' && heightUnitsValid && (heightUnits == "cm" ? heightValue >= 150 && heightValue <= 193 : heightValue >= 59 && heightValue <= 76);
        return (typeof byr === 'number' && byr >= 1920 && byr <= 2002) &&
            (typeof iyr === 'number' && iyr >= 2010 && iyr <= 2020) &&
            (typeof eyr === 'number' && eyr >= 2020 && eyr <= 2030) &&
            (heightUnitsValid && heightValueValid) &&
            hclValidator.test(arg.hcl) &&
            validEcl.find(function (x) { return x == arg.ecl; }) !== undefined &&
            pidValidator.test(arg.pid);
    }
    return false;
};
var part1 = function (documents) {
    console.log("Part 1");
    console.log("======");
    var count = 0;
    for (var i = 0; i < documents.length; i++) { //what the heck is downlevelIteration and why did I need to turn it on?!
        if (areFieldsValid(documents[i])) {
            count++;
        }
    }
    console.log("There are " + count + " valid passports.");
};
var part2 = function (documents) {
    console.log("Part 2");
    console.log("======");
    var count = 0;
    for (var i = 0; i < documents.length; i++) { //what the heck is downlevelIteration and why did I need to turn it on?!
        if (isDataValid(documents[i])) {
            count++;
        }
    }
    console.log("There are " + count + " valid passports.");
};
//Load Passport Batch file
var rawDocuments = fs.readFileSync("./input").toString().split("\n");
var parsedDocs = parseRawData(rawDocuments);
console.log(parsedDocs[0]);
part1(parsedDocs);
part2(parsedDocs);
//# sourceMappingURL=index.js.map