import { Accounts, Accounts_DB_Type, Accounts_DB_Type_Nullable} from "./fake-db";
import { update_user_schema } from "./Schemas/users_schema";
import { format } from 'date-fns';


const max_users_by_group = 5;


export async function get_user(group_id: Accounts_DB_Type["group-id"], name: Accounts_DB_Type["name"]) {
    return Accounts.find(user => user["group-id"] === group_id && user["name"] === name);
}

export async function get_user_by_id(account_id: Accounts_DB_Type["id"]) {
    return Accounts.find(user => user.id === account_id);
}

export async function get_users_in_group(group_id: Accounts_DB_Type["group-id"]) {
    return Accounts.filter(user => user["group-id"] === group_id);
}


export async function create_user(group_id: Accounts_DB_Type["group-id"], name: Accounts_DB_Type["name"], image: Accounts_DB_Type["image"], account_type: Accounts_DB_Type["type"]) {
    if (await get_user(group_id, name)) {
        return false; // L'utilisateur existe déjà dans le groupe !!
    }
    
    const group = await get_users_in_group(group_id)
    const group_length = group?.length
    if (group_length == max_users_by_group) { // Le nombre maximum d'utilisateur dans ce groupe est atteint !
        return false;
    }

    const currentDate = new Date();
    Accounts.push({
        "id": Accounts.length + 1,
        "admin": group_length == 0,
        "name": name,
        "image": image,
        "type": account_type,
        "created-date": format(currentDate, 'yyyy-MM-dd'),
        "preferences": [],
        "group-id": group_id
    });

    return true;
}


export async function update_user(id: Accounts_DB_Type["id"], changes: any) {
    let user_data = await get_user_by_id(id)
    if (!user_data) {
        return false; // L'utilisateur n'existe pas ?!
    }

    if (changes["id"] || changes["admin"] || changes["created-date"] || changes["type"] || changes["group-id"]) {
        return false; // Une requête malveillante veut modifier les infos d'id et/ou admin ?!
    }

    user_data.name = changes.Name || user_data.name
    user_data.image = changes.Image || user_data.image
    user_data.preferences = changes.Preferences || user_data.preferences

    return true;
}


export async function delete_user(id: Accounts_DB_Type["id"]) {
    const user_data = await get_user_by_id(id);
    if (!user_data) {
        return false; // L'utilisateur n'existe pas ?!
    }

    const deleted_user = Accounts.splice(id - 1, 1)
    console.log("Element:", user_data)
    console.log("Deleted:", deleted_user)

    return true;
}