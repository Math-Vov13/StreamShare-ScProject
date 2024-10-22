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
exports.validate_user_token = exports.validate_group_token = void 0;
const groups_func_1 = require("../../models/groups_func");
const users_func_1 = require("../../models/users_func");
const auth_func_1 = require("../../utils/auth_func");
const validate_group_token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    // let token;
    // if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
    //     token = req.headers['authorization'].split(' ')[1];
    // }
    // if (!token) {
    //     res.status(401).json({detail: "You need to add a valid credentials!"});
    //     return;
    // }
    if (!token) {
        res.status(401).json({ detail: "You need to add a valid credentials!" });
        return;
    }
    try {
        const decoded = yield (0, auth_func_1.decodeToken)(token, auth_func_1.Token_Type.Group);
        const active_group = yield (0, groups_func_1.get_group_by_id)(decoded.id);
        if (!active_group) { // Token invalide ou expiré
            res.clearCookie("token");
            res.status(403).json({ detail: "Your credentials is not valid or is expired!" });
            return;
        }
        req.group = active_group; // Ajoute les data du groupe dans le Headers
        next();
    }
    catch (error) {
        res.clearCookie("token");
        res.status(403).json({ detail: "Your credentials is not valid or is expired!" });
        return;
    }
});
exports.validate_group_token = validate_group_token;
const validate_user_token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.tokenU;
    if (!token) {
        res.status(401).json({ detail: "You need to add a valid User credentials!" });
        return;
    }
    try {
        const decoded = yield (0, auth_func_1.decodeToken)(token, auth_func_1.Token_Type.User);
        const active_user = yield (0, users_func_1.get_user_by_id)(decoded.usrid);
        if (!active_user) { // Token invalide ou expiré
            res.clearCookie("tokenU");
            res.status(403).json({ detail: "Your User credentials is not valid or is expired!" });
            return;
        }
        req.user = active_user; // Ajoute l'id dans le Headers
        next();
    }
    catch (error) {
        res.clearCookie("tokenU");
        res.status(403).json({ detail: "Your User credentials is not valid or is expired!" });
        return;
    }
});
exports.validate_user_token = validate_user_token;
