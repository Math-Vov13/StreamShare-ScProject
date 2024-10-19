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
const fake_db_1 = require("./fake-db");
function get_content_by_id(content_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return fake_db_1.Contents.find((content) => content.id === content_id);
    });
}
function search_trends() {
    return __awaiter(this, void 0, void 0, function* () {
        return fake_db_1.Contents.slice(0, 10);
    });
}
function search_content() {
    return __awaiter(this, arguments, void 0, function* (fulfil_name = "", genres = [], tags = []) {
        let results = Array(); // Liste contenant les contenus proposés par la BDD
        console.log(fulfil_name);
        console.log(genres);
        console.log(tags);
        // Meilleures Correspondances !
        results.push(...fake_db_1.Contents.filter(raw => raw.name.startsWith(fulfil_name) &&
            genres.every(element => raw.genres.includes(element)) &&
            tags.every(element => raw.tags.includes(element))));
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
