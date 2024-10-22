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
const validate_group_id_1 = require("../middlewares/routes/validate_group_id");
const validate_token_1 = require("../middlewares/routes/validate_token");
const groups_schema_1 = require("../models/Schemas/groups_schema");
const groups_func_1 = require("../models/groups_func");
// Router
const router = (0, express_1.Router)();
router.get("/:group_id/users", validate_token_1.validate_group_token, validate_group_id_1.validate_group_id, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const group_id = req.params.group_id;
    const { Name } = req.query;
    if (((_a = req.group) === null || _a === void 0 ? void 0 : _a.id) !== group_id) {
        res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
        return;
    }
    if (!Name) { // Si 'Name' est vide, envoyé la liste de tous les utilisateurs
        const users_list = yield (0, users_func_1.get_users_in_group)(group_id);
        if (!users_list) {
            res.sendStatus(504);
        }
        else {
            res.json({ response: yield (0, users_func_1.get_users_in_group)(group_id) });
        }
        return;
    }
    const User_data = yield (0, users_func_1.get_user)(group_id, Name);
    if (!User_data) {
        res.status(404).json({ detail: "User not found!" });
        return;
    }
    else {
        res.json({ response: { id: User_data.id } });
        return;
    }
}));
router.post("/:group_id/users", validate_token_1.validate_group_token, validate_group_id_1.validate_group_id, (0, data_validation_1.body_data_validation)(users_schema_1.create_user_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const group_id = req.params.group_id;
    const { Name, Thumbnail, Type } = req.body;
    if (((_a = req.group) === null || _a === void 0 ? void 0 : _a.id) !== group_id) {
        res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
        return;
    }
    const created = yield (0, users_func_1.create_user)(group_id, Name, Thumbnail, Type);
    if (created) {
        res.status(201).send({ detail: "User created!" });
        return;
    }
    else {
        res.status(409).send({ detail: "Your request can't be handled!" });
        return;
    }
    ;
}));
router.put("/:group_id/users", validate_token_1.validate_group_token, validate_group_id_1.validate_group_id, (0, data_validation_1.query_data_validation)(users_schema_1.user_login_schema), (0, data_validation_1.body_data_validation)(users_schema_1.update_user_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const group_id = req.params.group_id;
    const { Name } = req.query;
    const Changes = req.body;
    if (((_a = req.group) === null || _a === void 0 ? void 0 : _a.id) !== group_id) {
        res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
        return;
    }
    const user_data = yield (0, users_func_1.get_user)(group_id, Name);
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
router.delete("/:group_id/users", validate_token_1.validate_group_token, validate_group_id_1.validate_group_id, (0, data_validation_1.query_data_validation)(users_schema_1.user_login_schema), (0, data_validation_1.body_data_validation)(groups_schema_1.group_login_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const group_id = req.params.group_id;
    const { Name } = req.query;
    const { Mail, Password } = req.body;
    if (((_a = req.group) === null || _a === void 0 ? void 0 : _a.id) !== group_id) {
        res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
        return;
    }
    if (!(yield (0, groups_func_1.isGroup_Valide)(req.group, Mail, Password))) {
        res.sendStatus(403); // Mail ou Mot de Passe invalide !
        return;
    }
    const user_target = yield (0, users_func_1.get_user)(group_id, Name);
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
