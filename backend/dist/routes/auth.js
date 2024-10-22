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
exports.create_token = void 0;
// Imports
const express_1 = require("express");
const groups_func_1 = require("../models/groups_func");
const data_validation_1 = require("../middlewares/routes/data_validation");
const groups_schema_1 = require("../models/Schemas/groups_schema");
const auth_func_1 = require("../utils/auth_func");
const router = (0, express_1.Router)();
const create_token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const time_age_RefreshToken = 365 * 24 * 60 * 60 * 1000; // ==> 1 an
    const time_age_AccessToken = 31 * 24 * 60 * 60 * 1000; // ==> 1 mois
    // Sécurité
    const group_data = yield (0, groups_func_1.get_group)(email, password);
    if (!group_data) {
        // Supprime les cookies
        res.clearCookie("refresh");
        res.clearCookie("token");
        res.clearCookie("tokenU");
        res.sendStatus(404);
        return;
    }
    // Cookies
    const refreshToken = "AccessToken!";
    const accessToken = yield (0, auth_func_1.generate_groupToken)(group_data.id);
    res.cookie("refresh", refreshToken, { maxAge: time_age_RefreshToken, httpOnly: true, secure: true, sameSite: "strict" });
    res.cookie("token", accessToken, { maxAge: time_age_AccessToken, httpOnly: true, secure: true, sameSite: "strict" });
    res.status(201).json({ token: accessToken });
    return;
});
exports.create_token = create_token;
router.post('/', (0, data_validation_1.body_data_validation)(groups_schema_1.group_login_schema), exports.create_token);
router.delete('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Supprime les cookies
    res.clearCookie("refresh");
    res.clearCookie("token");
    res.clearCookie("tokenU");
    res.sendStatus(205);
    return;
}));
exports.default = router;
