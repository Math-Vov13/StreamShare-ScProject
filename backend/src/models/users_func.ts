import { update_user_schema, user_type, table_user_name } from "./Schemas/users_schema";
import { content_type } from "./Schemas/content_schema";
import { query } from "../models/db-connector";
import { format } from 'date-fns';
import { QueryResult } from "pg";



export async function get_user(group_id: user_type["group_id"], name: user_type["name"]) {
    try {
        const results: QueryResult<user_type> = await query(
            `SELECT * FROM ${table_user_name}
            WHERE group_id='${group_id}'
            AND name='${name}'`); //Requête

        return (results.rowCount && results.rowCount > 0)? results.rows[0] : null;

    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
}

export async function get_user_by_id(account_id: user_type["id"]) {
    try {
        const results: QueryResult<user_type> = await query(
            `SELECT * FROM ${table_user_name}
            WHERE id='${account_id}'`); //Requête

        return (results.rowCount && results.rowCount > 0)? results.rows[0] : null;

    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
}

export async function get_users_in_group(group_id: user_type["group_id"]) {
    try {
        const results: QueryResult<user_type> = await query(
            `SELECT * FROM ${table_user_name}
            WHERE group_id='${group_id}'`); //Requête

        return results.rows
        
    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
}


export async function create_user(group_id: user_type["group_id"], name: user_type["name"], image: user_type["thumbnail"], account_type: user_type["type"]) {
    try {
        const results: QueryResult<user_type> = await query(
            `INSERT INTO ${table_user_name}(name, thumbnail, group_id, type)
            VALUES('${name}', '${image}', '${group_id}', '${account_type}')
            RETURNING id;`); // Requête

        return results;
        
    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
}


export async function user_watched_content(id: user_type["id"], content_id: content_type["id"]){
    try {
        const results: QueryResult<user_type> = await query(
            `UPDATE ${table_user_name}
            SET interests = array_append(COALESCE(interests, '{}'), '${content_id}')
            WHERE id='${id}';`); // Requête

        return results;
        
    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
}


export async function update_user(id: user_type["id"], changes: Array<string>) {
    let user_data = await get_user_by_id(id)
    if (!user_data) {
        return false; // L'utilisateur n'existe pas ?!
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
}


export async function delete_user(id: user_type["id"]) {
    const user_data = await get_user_by_id(id);
    if (!user_data) {
        return false; // L'utilisateur n'existe pas ?!
    }

    try {
        const results: QueryResult<user_type> = await query(
            `DELETE FROM ${table_user_name}
            WHERE id='${id}';`); // Requête

    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }

    return true;
}