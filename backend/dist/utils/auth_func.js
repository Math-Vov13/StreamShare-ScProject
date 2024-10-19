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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = exports.decodeToken = exports.generate_userToken = exports.generate_groupToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For token-based authentication
const bcryptjs_1 = __importDefault(require("bcryptjs")); // For password hashing
/// Tokens JWT
const generate_groupToken = (group_id) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ id: group_id }, process.env.SECRET_KEY, { expiresIn: '31d' });
});
exports.generate_groupToken = generate_groupToken;
const generate_userToken = (group_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ id: group_id, usrid: user_id }, process.env.SECRET_KEY, { expiresIn: '1d' });
});
exports.generate_userToken = generate_userToken;
const decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
});
exports.decodeToken = decodeToken;
/// Hash Passwords (Bcrypt)
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
const comparePassword = (passwordCompared, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(passwordCompared, hashedPassword);
});
exports.comparePassword = comparePassword;
