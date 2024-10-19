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
const express_1 = require("express");
const groups_func_1 = require("../models/groups_func");
const validate_token_1 = require("../middlewares/routes/validate_token");
const data_validation_1 = require("../middlewares/routes/data_validation");
const groups_schema_1 = require("../models/Schemas/groups_schema");
const router = (0, express_1.Router)();
router.get("/", validate_token_1.validate_group_token, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const group_data = yield (0, groups_func_1.get_group_by_id)((_a = req.group) === null || _a === void 0 ? void 0 : _a.id);
    if (!group_data) {
        res.sendStatus(404);
        return;
    }
    ; // Not Found!
    res.json({ response: group_data });
    return;
}));
router.post("/", (0, data_validation_1.body_data_validation)(groups_schema_1.create_group_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Mail, Password, Subscription } = req.body;
    const created = yield (0, groups_func_1.create_group)(Name, Password, Mail, Subscription);
    if (created) {
        // Supprime les cookies
        res.clearCookie("refresh");
        res.clearCookie("token");
        res.clearCookie("tokenU");
        res.status(201).json({ detail: "Group created!" });
        return;
    }
    else {
        res.status(409).json({ detail: "Your request can't be handled!" });
        return;
    }
    ;
}));
router.put("/", validate_token_1.validate_group_token, (0, data_validation_1.body_data_validation)(groups_schema_1.update_group_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Changes = req.body;
    const updated = yield (0, groups_func_1.update_group)((_a = req.group) === null || _a === void 0 ? void 0 : _a.id, Changes);
    if (updated) {
        res.status(200).json({ detail: "Group updated!" });
        return;
    }
    else {
        res.status(409).json({ detail: "Your request can't be handled!" });
        return;
    }
    ;
}));
router.delete("/", validate_token_1.validate_group_token, (0, data_validation_1.body_data_validation)(groups_schema_1.group_login_schema), (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: utiliser une requête SQL directement...
    res.status(403).json({ detail: "This method is only reserved to our Internal Services!" });
    return;
}));
exports.default = router;
