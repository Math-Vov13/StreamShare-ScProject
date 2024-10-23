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
const users_func_1 = require("../models/users_func");
const router = (0, express_1.Router)();
router.get("/", validate_token_1.validate_user_token, 
// body_data_validation(get_content_schema),
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Le body de la requête est vide
    const Condition1 = Object.keys(req.body).length == 0; // Renvoie les trends (quand l'utilisateur se connecte sur la page d'accueil)
    // Les valeurs du body de la requête sont vides
    const Condition2 = !req.body.fulfilname && (((_a = req.body.categories) === null || _a === void 0 ? void 0 : _a.length) || Array().length) == 0 && (((_b = req.body.tags) === null || _b === void 0 ? void 0 : _b.length) || Array().length) == 0; // Renvoie les trends (quand l'utilisateur efface sa recherche)
    console.log("Condition1:", Condition1);
    console.log("Condition2:", Condition2);
    if (Condition1 || Condition2) {
        const search_results = yield (0, content_func_1.search_trends)();
        let secured_search_results = Array();
        search_results === null || search_results === void 0 ? void 0 : search_results.forEach((element) => {
            secured_search_results.push({
                id: element.id,
                title: element.title,
                thumbnail: element.thumbnail,
                note: element.note
            });
        });
        res.status(200).json({ type: "media/Trends", response: secured_search_results });
        return; // Renvoie les trends
    }
    // Recherche de contenus pertinents pour l'utilisateur (en fonction de ses mots clés)
    const contents = yield (0, content_func_1.search_content)(req.body.fulfilname, req.body.categories, req.body.tags);
    if (!contents) {
        res.sendStatus(404);
        return;
    }
    let secured_contents = Array();
    contents.forEach((element) => {
        secured_contents.push({
            id: element.id,
            title: element.title,
            all_audiances: element.all_audiances,
            note: element.note,
            release_date: element.release_date,
            categories: element.categories,
            tags: element.tags,
            genre: element.genre
        });
    });
    // Affinage des résultats de recherche par IA avec l'API de Gemini (SCORING: en fonction des résultats de la BDD + de ses mots clés)
    // null
    res.status(200).json({ type: "media/Search", lenght: Object.keys(contents).length, response: secured_contents });
}));
router.get("/:content_id", validate_token_1.validate_user_token, validate_content_id_1.validate_content_id, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content_id = req.params.content_id;
    res.json({ response: yield (0, content_func_1.get_content_by_id)(content_id) });
}));
router.post("/:content_id/watch", validate_token_1.validate_user_token, validate_content_id_1.validate_content_id, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const content_id = req.params.content_id;
    // TODO: Ajouter le watch_time
    if (yield (0, users_func_1.user_watched_content)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, content_id)) {
        res.sendStatus(200);
        return;
    }
    else {
        res.sendStatus(504);
        return;
    }
}));
router.delete("/:content_id", validate_token_1.validate_user_token, validate_content_id_1.validate_content_id, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: utiliser une requête SQL directement...
    res.status(403).json({ detail: "This method is only reserved to our Internal Services!" });
    return;
}));
exports.default = router;
