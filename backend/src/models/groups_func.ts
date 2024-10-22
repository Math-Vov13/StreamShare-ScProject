import { group_type, table_group_name } from "./Schemas/groups_schema";
import { hashPassword, comparePassword } from "../utils/auth_func";
import { query } from "../models/db-connector";
import { format } from 'date-fns';
import { QueryResult } from "pg";



export async function isGroup_Valide(group: group_type, mail: group_type["email"], pswd: group_type["password"]) {
    console.log(group);
    if (group.email !== mail) { return false; }

    console.log(mail, pswd)
    const isMatch = await comparePassword(pswd, group.password); // Compare Password
    console.log(isMatch);
    if (! isMatch) {
        return false;
    } else {
        return true;
    }
}


export async function get_group(mail: group_type["email"], pswd: group_type["password"]) {
    try {
        const results: QueryResult<group_type> = await query(
            `SELECT * FROM ${table_group_name}
            WHERE email='${mail}'`); //Requête
        
        if (results.rowCount && results.rowCount > 0) {
            if (! await isGroup_Valide(results.rows[0], mail, pswd)) {
                console.log("Groupe non valide !")
                return null;
            }

            return results.rows[0];
        }

    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
}

export async function get_group_by_id(group_id: group_type["id"]) {
    try {
        const results: QueryResult<group_type> = await query(
            `SELECT * FROM ${table_group_name}
            WHERE id='${group_id}'`); //Requête

        return (results.rowCount && results.rowCount > 0)? results.rows[0] : null;
        
    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
}


export async function create_group(grp_name: group_type["name"], pswd: group_type["password"], mail: group_type["email"], sub: group_type["subscription"]) {
    if (await get_group(mail, pswd)) {
        return false; // Le Groupe existe déjà !!
    }
    const hashed_pswd = await hashPassword(pswd);

    try {
        const results: QueryResult<Array<group_type["id"]>> = await query(
            `INSERT INTO ${table_group_name}(name, email, password, subscription)
            VALUES('${grp_name}', '${mail}', '${hashed_pswd}', '${sub}')
            RETURNING id;`); //Requête

        return results;

    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
}


export async function update_group(id: group_type["id"], changes: Array<group_type["name"] | group_type["email"] | group_type["password"] | group_type["subscription"]>) {
    let group_data = await get_group_by_id(id);
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
}