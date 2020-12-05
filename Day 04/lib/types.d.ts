export interface ValidTravelDocument {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid?: string;
}
export declare function isValid(arg: any): arg is ValidTravelDocument;
