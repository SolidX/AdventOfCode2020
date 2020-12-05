import * as fs from 'fs';

const parseRawData = (rawData: string[]) => {
    const fieldParser : RegExp =  /([a-z]{3}):([A-Za-z0-9#]+)/g;

    let documents : any[] = [];
    let tmpObj : any = {};

    for (let i: number = 0; i < rawData.length; i++) {
        let line : string = rawData[i].trim();
        
        if (line.length == 0) {
            documents.push(tmpObj);
            tmpObj = {};
            continue;
        }
        
        let matches = line.matchAll(fieldParser);
        for (const match of matches) { 
            tmpObj[match[1]] = match[2];
        }
    }

    return documents;
}

const areFieldsValid = (arg: any) : boolean => {
    return arg && arg.byr && arg.iyr && arg.eyr && arg.hgt && arg.hcl && arg.ecl && arg.pid;
}

const isDataValid = (arg: any) : boolean => {
    const hclValidator : RegExp = /^#[0-9a-f]{6}$/g;
    const validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    const pidValidator : RegExp = /^[0-9]{9}$/g;

    if (areFieldsValid(arg)) {
        let byr = parseInt(arg.byr);
        let iyr = parseInt(arg.iyr);
        let eyr = parseInt(arg.eyr);

        let heightValue = parseInt(arg.hgt.substring(0, arg.hgt.length - 2));
        let heightUnits = arg.hgt.substring(arg.hgt.length - 2);
        let heightUnitsValid = heightUnits == "cm" || heightUnits == "in";
        let heightValueValid = typeof heightValue === 'number' && heightUnitsValid && (heightUnits == "cm" ? heightValue >= 150 && heightValue <= 193 : heightValue >= 59 && heightValue <= 76);

        return  (typeof byr === 'number' && byr >= 1920 && byr <= 2002) &&
                (typeof iyr === 'number' && iyr >= 2010 && iyr <= 2020) &&
                (typeof eyr === 'number' && eyr >= 2020 && eyr <= 2030) &&
                (heightUnitsValid && heightValueValid) &&                
                hclValidator.test(arg.hcl) &&
                validEcl.find(x => x == arg.ecl) !== undefined &&
                pidValidator.test(arg.pid);
    }

    return false;
}

const part1 = (documents: any[]) => {
    console.log("Part 1");
    console.log("======");

    let count = 0;
    for (let i = 0; i < documents.length; i++) { //what the heck is downlevelIteration and why did I need to turn it on?!
        if (areFieldsValid(documents[i])) {
            count++;
        }
    }
    console.log(`There are ${count} valid passports.`);
}

const part2 = (documents: any[]) => {
    console.log("Part 2");
    console.log("======");

    let count = 0;
    for (let i = 0; i < documents.length; i++) { //what the heck is downlevelIteration and why did I need to turn it on?!
        if (isDataValid(documents[i])) {
            count++;
        }
    }
    console.log(`There are ${count} valid passports.`);
}

//Load Passport Batch file
const rawDocuments : string[] = fs.readFileSync("./input").toString().split("\n");
let parsedDocs = parseRawData(rawDocuments)
console.log(parsedDocs[0]);
part1(parsedDocs);
part2(parsedDocs);
