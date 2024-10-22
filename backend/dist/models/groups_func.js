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
exports.isGroup_Valide = isGroup_Valide;
exports.get_group = get_group;
exports.get_group_by_id = get_group_by_id;
exports.create_group = create_group;
exports.update_group = update_group;
const groups_schema_1 = require("./Schemas/groups_schema");
const auth_func_1 = require("../utils/auth_func");
const db_connector_1 = require("../models/db-connector");
function isGroup_Valide(group, mail, pswd) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(group);
        if (group.email !== mail) {
            return false;
        }
        console.log(mail, pswd);
        const isMatch = yield (0, auth_func_1.comparePassword)(pswd, group.password); // Compare Password
        console.log(isMatch);
        if (!isMatch) {
            return false;
        }
        else {
            return true;
        }
    });
}
function get_group(mail, pswd) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`SELECT * FROM ${groups_schema_1.table_group_name}
            WHERE email='${mail}'`); //Requête
            if (results.rowCount && results.rowCount > 0) {
                if (!(yield isGroup_Valide(results.rows[0], mail, pswd))) {
                    console.log("Groupe non valide !");
                    return null;
                }
                return results.rows[0];
            }
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
    });
}
function get_group_by_id(group_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`SELECT * FROM ${groups_schema_1.table_group_name}
            WHERE id='${group_id}'`); //Requête
            return (results.rowCount && results.rowCount > 0) ? results.rows[0] : null;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
    });
}
function create_group(grp_name, pswd, mail, sub) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield get_group(mail, pswd)) {
            return false; // Le Groupe existe déjà !!
        }
        const hashed_pswd = yield (0, auth_func_1.hashPassword)(pswd);
        try {
            const results = yield (0, db_connector_1.query)(`INSERT INTO ${groups_schema_1.table_group_name}(name, email, password, subscription)
            VALUES('${grp_name}', '${mail}', '${hashed_pswd}', '${sub}')
            RETURNING id;`); //Requête
            return results;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
    });
}
function update_group(id, changes) {
    return __awaiter(this, void 0, void 0, function* () {
        let group_data = yield get_group_by_id(id);
        if (!group_data) {
            return false; // L'utilisateur n'existe pas ?!
        }
        return true;
        // try {
        //     const results: QueryResult<Array<number>> = await query(
        //         `UPDATE INTO ${table_group_name}(name, email, password, subscription)
        //         VALUES(${grp_name}, ${mail}, ${pswd}, ${sub})`); //Requête
        // } catch (db_error) {
        //     // Log l'erreur
        //     console.log("DB ERROR:", db_error)
        //     return null
        // }
        // group_data.name = changes.Name || group_data.name
        // group_data.password = changes.Password || group_data.password
        // group_data.email = changes.Mail || group_data.email
        // group_data.subscription = changes.Subscription || group_data.subscription
        // group_data["updated-at"] = format(new Date(), 'yyyy-MM-dd')
        return true;
    });
}
