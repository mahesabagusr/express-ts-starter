"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonError_1 = __importDefault(require("./commonError"));
class Unauthorized extends commonError_1.default {
    constructor(message) {
        super(message || "Unauthorized");
    }
}
exports.default = Unauthorized;
