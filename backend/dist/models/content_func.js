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
exports.get_content_by_id = get_content_by_id;
exports.search_trends = search_trends;
exports.search_content = search_content;
const content_schema_1 = require("./Schemas/content_schema");
const db_connector_1 = require("./db-connector");
function get_content_by_id(content_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`SELECT * FROM ${content_schema_1.content_table_name}
            WHERE id='${content_id}'`); //Requête
            return (results.rowCount && results.rowCount > 0) ? results.rows[0] : null;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
        // return Contents.find((content) => content.id === content_id);
    });
}
function search_trends() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`SELECT * FROM ${content_schema_1.content_table_name}
            ORDER BY note DESC, release_date DESC
            LIMIT 10;`); //Requête
            return (results.rowCount && results.rowCount > 0) ? results.rows : null;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
        // return Contents.slice(0, 10);
    });
}
function search_content() {
    return __awaiter(this, arguments, void 0, function* (fulfil_name = "", genres = [], tags = []) {
        let results = Array(); // Liste contenant les contenus proposés par la BDD
        console.log(fulfil_name);
        console.log(genres);
        console.log(tags);
        try {
            const results = yield (0, db_connector_1.query)(`SELECT * FROM ${content_schema_1.content_table_name}
            WHERE name LIKE '${fulfil_name}' 
            AND categories @> ${genres}
            AND tags @> ${tags};`); //Requête
            return (results.rowCount && results.rowCount > 0) ? results.rows : null;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
        // Meilleures Correspondances !
        // results.push(...Contents.filter(raw => 
        //     raw.name.startsWith(fulfil_name) && 
        //     genres.every(element => raw.genres.includes(element)) && 
        //     tags.every(element => raw.tags.includes(element))
        // ));
        // console.log(results.length)
        // // Classiques
        // /// (par nom)
        // results.push(...Contents.filter( raw => {
        //     raw.name.startsWith(fulfil_name) && ! results.includes(raw)
        // }));
        // console.log(results.length)
        // /// (par genres)
        // results.push(...Contents.filter( raw => {
        //     genres.every(element => raw.genres.includes(element)) && ! results.includes(raw)
        // }));
        // console.log(results.length)
        // /// (par tags)
        // results.push(...Contents.filter( raw => {
        //     tags.every(element => raw.tags.includes(element)) && ! results.includes(raw)
        // }));
        // console.log(results.length)
        return results;
    });
}
