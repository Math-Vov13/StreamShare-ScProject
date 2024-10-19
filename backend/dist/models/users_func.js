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
exports.update_user = update_user;
exports.delete_user = delete_user;
const fake_db_1 = require("./fake-db");
const date_fns_1 = require("date-fns");
const max_users_by_group = 5;
function get_user(group_id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return fake_db_1.Accounts.find(user => user["group-id"] === group_id && user["name"] === name);
    });
}
function get_user_by_id(account_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return fake_db_1.Accounts.find(user => user.id === account_id);
    });
}
function get_users_in_group(group_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return fake_db_1.Accounts.filter(user => user["group-id"] === group_id);
    });
}
function create_user(group_id, name, image, account_type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield get_user(group_id, name)) {
            return false; // L'utilisateur existe déjà dans le groupe !!
        }
        const group = yield get_users_in_group(group_id);
        const group_length = group === null || group === void 0 ? void 0 : group.length;
        if (group_length == max_users_by_group) { // Le nombre maximum d'utilisateur dans ce groupe est atteint !
            return false;
        }
        const currentDate = new Date();
        fake_db_1.Accounts.push({
            "id": fake_db_1.Accounts.length + 1,
            "admin": group_length == 0,
            "name": name,
            "image": image,
            "type": account_type,
            "created-date": (0, date_fns_1.format)(currentDate, 'yyyy-MM-dd'),
            "preferences": [],
            "group-id": group_id
        });
        return true;
    });
}
function update_user(id, changes) {
    return __awaiter(this, void 0, void 0, function* () {
        let user_data = yield get_user_by_id(id);
        if (!user_data) {
            return false; // L'utilisateur n'existe pas ?!
        }
        if (changes["id"] || changes["admin"] || changes["created-date"] || changes["type"] || changes["group-id"]) {
            return false; // Une requête malveillante veut modifier les infos d'id et/ou admin ?!
        }
        user_data.name = changes.Name || user_data.name;
        user_data.image = changes.Image || user_data.image;
        user_data.preferences = changes.Preferences || user_data.preferences;
        return true;
    });
}
function delete_user(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_data = yield get_user_by_id(id);
        if (!user_data) {
            return false; // L'utilisateur n'existe pas ?!
        }
        const deleted_user = fake_db_1.Accounts.splice(id - 1, 1);
        console.log("Element:", user_data);
        console.log("Deleted:", deleted_user);
        return true;
    });
}
