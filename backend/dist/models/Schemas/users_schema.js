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
exports.update_user_schema = exports.create_user_schema = exports.user_login_schema = exports.table_user_name = void 0;
const yup = __importStar(require("yup"));
exports.table_user_name = "Users";
var account_type;
(function (account_type) {
    account_type[account_type["Adult"] = 0] = "Adult";
    account_type[account_type["Children"] = 1] = "Children";
})(account_type || (account_type = {}));
exports.user_login_schema = yup.object({
    name: yup.string().required()
}).noUnknown();
exports.create_user_schema = yup.object({
    name: yup.string().required(),
    thumbnail: yup.string().notRequired(), // si n'est pas fournit = 'undefined' ==> basique thumbnail
    type: yup.mixed().oneOf(["Adult", "Children"])
}).noUnknown();
exports.update_user_schema = yup.object({
    name: yup.string().nullable(),
    thumbnail: yup.string().nullable()
}).test('at-least-one', 'At least one field must not be null', (value) => {
    // Vérifie si au moins une des valeurs n'est pas null
    return Object.values(value).some(val => val !== null && val !== undefined);
}).noUnknown();
