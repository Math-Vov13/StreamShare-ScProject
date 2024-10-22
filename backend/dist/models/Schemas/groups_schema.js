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
exports.group_login_schema = exports.update_group_schema = exports.create_group_schema = exports.table_group_name = void 0;
const yup = __importStar(require("yup"));
exports.table_group_name = "Account";
exports.create_group_schema = yup.object({
    Name: yup.string().required(),
    Mail: yup.string().email().required(),
    Password: yup.string().required(),
    Subscription: yup.string().required()
}).noUnknown();
exports.update_group_schema = yup.object({
    Name: yup.string().nullable(),
    Subscription: yup.string().nullable()
}).test('at-least-one', 'At least one field must not be null', (value) => {
    // Vérifie si au moins une des valeurs n'est pas null
    return Object.values(value).some(val => val !== null && val !== undefined);
}).noUnknown();
exports.group_login_schema = yup.object({
    Mail: yup.string().email().required(),
    Password: yup.string().required()
}).noUnknown();
