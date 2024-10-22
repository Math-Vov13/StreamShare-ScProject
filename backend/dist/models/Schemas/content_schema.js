"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_content_schema = exports.tags_schema = exports.categories_schema = exports.content_table_name = void 0;
const yup = __importStar(require("yup"));
exports.content_table_name = "Movies";
var movie_genre;
(function (movie_genre) {
    movie_genre[movie_genre["Anime"] = 0] = "Anime";
    movie_genre[movie_genre["Movie"] = 1] = "Movie";
    movie_genre[movie_genre["Serie"] = 2] = "Serie";
})(movie_genre || (movie_genre = {}));
exports.categories_schema = yup.mixed().oneOf(["Science Fiction", "Action", "Crime", "Drama", "Thriller", "Romance", "Adventure", "Animation", "Superhero", "Fantasy", "Horror", "Musical", "Family"]);
exports.tags_schema = yup.string().nullable();
exports.get_content_schema = yup.object({
    fulfilname: yup.string(),
    categories: yup.array(exports.categories_schema),
    tags: yup.array(exports.tags_schema)
}).noUnknown();
