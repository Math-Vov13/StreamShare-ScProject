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
const validate_content_id_1 = require("../middlewares/routes/validate_content_id");
const validate_token_1 = require("../middlewares/routes/validate_token");
const content_func_1 = require("../models/content_func");
const data_validation_1 = require("../middlewares/routes/data_validation");
const content_schema_1 = require("../models/Schemas/content_schema");
const router = (0, express_1.Router)();
router.get("/", validate_token_1.validate_user_token, (0, data_validation_1.body_data_validation)(content_schema_1.get_content_schema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Le body de la requête est vide
    if (Object.keys(req.body).length == 0) {
        res.status(200).json({ type: "media/Trends", response: yield (0, content_func_1.search_trends)() });
        return; // Renvoie les trends (quand l'utilisateur se connecte sur la page d'accueil)
    }
    // Les valeurs du body de la requête sont vides
    if (!req.body.FulfilName && (((_a = req.body.Categories) === null || _a === void 0 ? void 0 : _a.length) || Array().length) == 0 && (((_b = req.body.Tags) === null || _b === void 0 ? void 0 : _b.length) || Array().length) == 0) {
        res.status(200).json({ type: "media/Trends", response: yield (0, content_func_1.search_trends)() });
        return; // Renvoie les trends (quand l'utilisateur efface sa recherche)
    }
    // Recherche de contenus pertinents pour l'utilisateur (en fonction de ses mots clés)
    let contents = yield (0, content_func_1.search_content)(req.body.FulfilName, req.body.Categories, req.body.Tags);
    if (contents.length == 0) {
        res.sendStatus(404);
        return;
    }
    // Affinage des résultats de recherche par IA avec l'API de Gemini (SCORING: en fonction des résultats de la BDD + de ses mots clés)
    // null
    res.status(200).json({ type: "media/Search", lenght: contents.length, response: contents });
}));
router.get("/:content_id", validate_token_1.validate_user_token, validate_content_id_1.validate_content_id, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content_id = req.params.content_id;
    res.json({ response: yield (0, content_func_1.get_content_by_id)(content_id) });
}));
router.delete("/:content_id", validate_token_1.validate_user_token, validate_content_id_1.validate_content_id, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: utiliser une requête SQL directement...
    res.status(403).json({ detail: "This method is only reserved to our Internal Services!" });
    return;
}));
exports.default = router;
