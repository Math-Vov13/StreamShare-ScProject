"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query_data_validation = exports.body_data_validation = void 0;
const body_data_validation = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        req.body = (yield schema.validate(data)) || {};
        next();
    }
    catch (error) {
        res.sendStatus(400);
    }
});
exports.body_data_validation = body_data_validation;
const query_data_validation = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query;
    try {
        yield schema.validate(data);
        next();
    }
    catch (error) {
        res.sendStatus(400);
    }
});
exports.query_data_validation = query_data_validation;
