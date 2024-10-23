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
const users_schema_1 = require("../models/Schemas/users_schema");
const data_validation_1 = require("../middlewares/routes/data_validation");
const validate_token_1 = require("../middlewares/routes/validate_token");
const groups_schema_1 = require("../models/Schemas/groups_schema");
const groups_func_1 = require("../models/groups_func");
const auth_func_1 = require("../utils/auth_func");
// Router
const router = (0, express_1.Router)();
router.get("/users", validate_token_1.validate_group_token, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name } = req.query;
    console.log("GET /users");
    // Retourne tous les utilisateurs
    if (!name) { // Si 'Name' est vide, envoyé la liste de tous les utilisateurs
        console.log("Cookies:", req.cookies);
        const user_token = req.cookies["tokenU"];
        console.log("Cookie:", user_token);
        if (user_token) {
            const decoded_token = yield (0, auth_func_1.decodeToken)(user_token, auth_func_1.Token_Type.User);
            console.log("Decoded:", decoded_token);
            const User_data = yield (0, users_func_1.get_user_by_id)(decoded_token.usrid);
            console.log("User:", User_data);
            if (!User_data) {
                res.status(404).json({ detail: "User not found!" });
                return;
            }
            else {
                res.json({ response: User_data });
                return;
            }
        }
        const users_list = yield (0, users_func_1.get_users_in_group)((_a = req.group) === null || _a === void 0 ? void 0 : _a.id);
        if (!users_list) {
            res.sendStatus(504);
        }
        else {
            let secured_user_list = Array();
            users_list.forEach((element) => {
                secured_user_list.push({
                    name: element.name,
                    thumbnail: element.thumbnail,
                    type: element.type,
                    admin: element.admin
                });
            });
            res.json({ response: secured_user_list });
        }
        return;
    }
    // Retourne les data d'un utilisateur
    const User_data = yield (0, users_func_1.get_user)((_b = req.group) === null || _b === void 0 ? void 0 : _b.id, name);
    if (!User_data) {
        res.status(404).json({ detail: "User not found!" });
        return;
    }
    else {
        res.json({ response: User_data });
        return;
    }
}));
router.post("/users", validate_token_1.validate_group_token, (0, data_validation_1.body_data_validation)(users_schema_1.create_user_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, thumbnail, type } = req.body;
    console.log("POST /users");
    const created = yield (0, users_func_1.create_user)((_a = req.group) === null || _a === void 0 ? void 0 : _a.id, name, thumbnail, type);
    if (created) {
        // req.query = { name: name }
        // await create_user_token(req, res); // Créer le cookie
        res.status(201).send({ detail: "User created!" });
        return;
    }
    else {
        res.status(409).send({ detail: "Your request can't be handled!" });
        return;
    }
    ;
}));
router.put("/users", validate_token_1.validate_group_token, (0, data_validation_1.query_data_validation)(users_schema_1.user_login_schema), (0, data_validation_1.body_data_validation)(users_schema_1.update_user_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.query;
    const Changes = req.body;
    const user_data = yield (0, users_func_1.get_user)((_a = req.group) === null || _a === void 0 ? void 0 : _a.id, name);
    if (!user_data) {
        res.status(404).json({ detail: "User not found!" });
        return;
    }
    if (Object.keys(Changes).length == 0) {
        res.status(400).json({ detail: "Your body request is empty!" });
        return;
    }
    const updated = yield (0, users_func_1.update_user)(user_data.id, Changes);
    if (updated) {
        res.status(200).send({ detail: "User updated!" });
    }
    else {
        res.status(409).send({ detail: "Your request can't be handled!" });
    }
}));
router.delete("/users", validate_token_1.validate_group_token, (0, data_validation_1.query_data_validation)(users_schema_1.user_login_schema), (0, data_validation_1.body_data_validation)(groups_schema_1.group_login_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.query;
    const { email, password } = req.body;
    if (!(yield (0, groups_func_1.isGroup_Valide)(req.group, email, password))) {
        res.sendStatus(403); // Mail ou Mot de Passe invalide !
        return;
    }
    const user_target = yield (0, users_func_1.get_user)((_a = req.group) === null || _a === void 0 ? void 0 : _a.id, name);
    if (!user_target) {
        res.status(404).json({ detail: "User not found!" });
        return;
    }
    if ((user_target === null || user_target === void 0 ? void 0 : user_target.admin) == true) {
        res.status(403).json({ detail: "You can't delete Admin user!" });
        return;
    }
    const deleted = yield (0, users_func_1.delete_user)(user_target.id);
    if (deleted) {
        res.status(200).send({ detail: "User deleted!" });
    }
    else {
        res.status(409).send({ detail: "Your request can't be handled!" });
    }
}));
exports.default = router;
