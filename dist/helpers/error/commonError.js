"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommonError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = CommonError;
