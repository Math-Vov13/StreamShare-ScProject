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
exports.get_group = get_group;
exports.get_group_by_id = get_group_by_id;
exports.create_group = create_group;
exports.update_group = update_group;
exports.delete_group = delete_group;
const fake_db_1 = require("./fake-db");
const auth_func_1 = require("../utils/auth_func");
const date_fns_1 = require("date-fns");
function get_group(mail, pswd) {
    return __awaiter(this, void 0, void 0, function* () {
        const group = yield Promise.all(fake_db_1.Groups.map((group) => __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield (0, auth_func_1.comparePassword)(pswd, group.password);
            return isMatch && group.email === mail ? group : null;
        })));
        return group.find(g => g !== null) || null;
    });
}
function get_group_by_id(group_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return fake_db_1.Groups.find(group => group.id === group_id);
    });
}
function create_group(grp_name, pswd, mail, sub) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield get_group(mail, pswd)) {
            return false; // Le Groupe existe déjà !!
        }
        const currentDate = new Date();
        return fake_db_1.Groups.push({
            "id": fake_db_1.Groups.length + 1,
            "name": grp_name,
            "password": yield (0, auth_func_1.hashPassword)(pswd),
            "email": mail,
            "created-date": (0, date_fns_1.format)(currentDate, 'yyyy-MM-dd'),
            "updated-at": (0, date_fns_1.format)(currentDate, 'yyyy-MM-dd'),
            "subscription": sub
        });
    });
}
function update_group(id, changes) {
    return __awaiter(this, void 0, void 0, function* () {
        let group_data = yield get_group_by_id(id);
        if (!group_data) {
            return false; // L'utilisateur n'existe pas ?!
        }
        if (changes["id"] || changes["created-date"]) {
            return false; // Une requête malveillante veut modifier les infos d'id et/ou admin ?!
        }
        group_data.name = changes.Name || group_data.name;
        group_data.password = changes.Password || group_data.password;
        group_data.email = changes.Mail || group_data.email;
        group_data.subscription = changes.Subscription || group_data.subscription;
        group_data["updated-at"] = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
        return true;
    });
}
function delete_group(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const group_data = yield get_group_by_id(id);
        if (!group_data) {
            return false; // L'utilisateur n'existe pas ?!
        }
        const deleted_group = fake_db_1.Groups.splice(group_data.id - 1, 1);
        console.log("Element:", group_data);
        console.log("Deleted:", deleted_group);
        return true;
    });
}
