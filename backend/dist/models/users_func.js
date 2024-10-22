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
exports.get_user = get_user;
exports.get_user_by_id = get_user_by_id;
exports.get_users_in_group = get_users_in_group;
exports.create_user = create_user;
exports.user_watched_content = user_watched_content;
exports.update_user = update_user;
exports.delete_user = delete_user;
const users_schema_1 = require("./Schemas/users_schema");
const db_connector_1 = require("../models/db-connector");
function get_user(group_id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`SELECT * FROM ${users_schema_1.table_user_name}
            WHERE group_id='${group_id}'
            AND name='${name}'`); //Requête
            return (results.rowCount && results.rowCount > 0) ? results.rows[0] : null;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
    });
}
function get_user_by_id(account_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`SELECT * FROM ${users_schema_1.table_user_name}
            WHERE id='${account_id}'`); //Requête
            return (results.rowCount && results.rowCount > 0) ? results.rows[0] : null;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
    });
}
function get_users_in_group(group_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`SELECT * FROM ${users_schema_1.table_user_name}
            WHERE group_id='${group_id}'`); //Requête
            return results.rows;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
    });
}
function create_user(group_id, name, image, account_type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`INSERT INTO ${users_schema_1.table_user_name}(name, thumbnail, group_id, type)
            VALUES('${name}', '${image}', '${group_id}', '${account_type}')
            RETURNING id;`); // Requête
            return results;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
    });
}
function user_watched_content(id, content_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, db_connector_1.query)(`UPDATE ${users_schema_1.table_user_name}
            SET interests = array_append(COALESCE(interests, '{}'), '${content_id}')
            WHERE id='${id}';`); // Requête
            return results;
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
    });
}
function update_user(id, changes) {
    return __awaiter(this, void 0, void 0, function* () {
        let user_data = yield get_user_by_id(id);
        if (!user_data) {
            return false; // L'utilisateur n'existe pas ?!
        }
        try {
            const results = yield (0, db_connector_1.query)(`UPDATE ${users_schema_1.table_user_name}
            SET updated_at=NOW()
            WHERE id='${id}'`); // Requête
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
        return true;
        // const setClause = Object.keys(changes)
        //     .map(key => `${key} = $1`)
        //     .join(', ');
        // try {
        //     const results: QueryResult<user_type> = await query(
        //         `UPDATE ${table_user_name}
        //         SET ${setClause}
        //         WHERE id=${id}`); // Requête
        // } catch (db_error) {
        //     // Log l'erreur
        //     console.log("DB ERROR:", db_error)
        //     return null
        // }
        return true;
    });
}
function delete_user(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_data = yield get_user_by_id(id);
        if (!user_data) {
            return false; // L'utilisateur n'existe pas ?!
        }
        try {
            const results = yield (0, db_connector_1.query)(`DELETE FROM ${users_schema_1.table_user_name}
            WHERE id='${id}';`); // Requête
        }
        catch (db_error) {
            // Log l'erreur
            console.log("DB ERROR:", db_error);
            return null;
        }
        return true;
    });
}
