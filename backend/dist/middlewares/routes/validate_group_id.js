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
exports.validate_group_id = void 0;
const groups_func_1 = require("../../models/groups_func");
const validate_group_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const group_id = req.params.group_id;
    try {
        if (yield (0, groups_func_1.get_group_by_id)(group_id)) { // Si l'Id du groupe existe
            next();
        }
        else {
            res.status(404).json({ detail: "This Group doesn't exists!" });
        }
    }
    catch (error) {
        res.status(500).json({ detail: "Internal Error!" });
    }
});
exports.validate_group_id = validate_group_id;
