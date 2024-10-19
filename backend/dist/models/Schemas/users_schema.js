"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_user_schema = exports.create_user_schema = exports.user_login_schema = exports.user_schema = void 0;
const yup = __importStar(require("yup"));
exports.user_schema = yup.object({
    "id": yup.number(),
    "admin": yup.bool().required(),
    "name": yup.string().required(),
    "image": yup.string().url().required(),
    "Type": yup.mixed().oneOf(["Adult", "Children"]).required(),
    "created-date": yup.date(),
    "preferences": yup.array().required(),
    "group-id": yup.number().required()
}).noUnknown();
exports.user_login_schema = yup.object({
    Name: yup.string().required()
}).noUnknown();
exports.create_user_schema = yup.object({
    Name: yup.string().required(),
    Image: yup.string().required(),
    Type: yup.mixed().oneOf(["Adult", "Children"])
}).noUnknown();
exports.update_user_schema = yup.object({
    Name: yup.string().nullable(),
    Image: yup.string().nullable(),
    Preferences: yup.array().nullable()
}).test('at-least-one', 'At least one field must not be null', (value) => {
    // Vérifie si au moins une des valeurs n'est pas null
    return Object.values(value).some(val => val !== null && val !== undefined);
}).noUnknown();
