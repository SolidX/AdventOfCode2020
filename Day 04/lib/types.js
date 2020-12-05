"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
function isValid(arg) {
    return arg && arg.byr && arg.ayr && arg.eyr && arg.hgt && arg.hcl && arg.ecl && arg.pid;
}
exports.isValid = isValid;
//# sourceMappingURL=types.js.map