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
// Imports
const express_1 = require("express");
const users_func_1 = require("../models/users_func");
// Types + Validation Middleware
const validate_token_1 = require("../middlewares/routes/validate_token");
const auth_func_1 = require("../utils/auth_func");
const validate_group_id_1 = require("../middlewares/routes/validate_group_id");
const data_validation_1 = require("../middlewares/routes/data_validation");
const users_schema_1 = require("../models/Schemas/users_schema");
// Router
const router = (0, express_1.Router)();
router.post("/:group_id/users/auth", validate_token_1.validate_group_token, validate_group_id_1.validate_group_id, (0, data_validation_1.query_data_validation)(users_schema_1.user_login_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const time_age_UserToken = 1 * 24 * 60 * 60 * 1000; // ==> 1 jour
    const { Name } = req.query;
    const group_id = req.params.group_id;
    // Security
    if (((_a = req.group) === null || _a === void 0 ? void 0 : _a.id) !== group_id) {
        res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
        return;
    }
    const user_data = yield (0, users_func_1.get_user)(group_id, Name);
    if (!user_data) {
        res.sendStatus(404);
        return;
    }
    // Cookies
    const accessToken = yield (0, auth_func_1.generate_userToken)(group_id, user_data.id);
    res.cookie("tokenU", accessToken, { maxAge: time_age_UserToken, httpOnly: true });
    res.sendStatus(201);
    return;
}));
router.delete("/:group_id/users/auth", validate_token_1.validate_group_token, validate_group_id_1.validate_group_id, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const group_id = req.params.group_id;
    // Security
    if (((_a = req.group) === null || _a === void 0 ? void 0 : _a.id) !== group_id) {
        res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
        return;
    }
    // Supprime les cookies
    res.clearCookie("tokenU");
    res.sendStatus(205);
    return;
}));
exports.default = router;
