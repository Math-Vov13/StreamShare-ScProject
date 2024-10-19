import { Groups, Groups_DB_Type} from "./fake-db";
import { hashPassword, comparePassword } from "../utils/auth_func";
import { format } from 'date-fns';



export async function get_group(mail: Groups_DB_Type["email"], pswd: Groups_DB_Type["password"]) {
    const group = await Promise.all(
        Groups.map(async (group) => {
            const isMatch = await comparePassword(pswd, group.password);
            return isMatch && group.email === mail ? group : null;
        })
    );

    return group.find(g => g !== null) || null;
}

export async function get_group_by_id(group_id: Groups_DB_Type["id"]) {
    return Groups.find(group => group.id === group_id);
}


export async function create_group(grp_name: Groups_DB_Type["name"], pswd: Groups_DB_Type["password"], mail: Groups_DB_Type["email"], sub: Groups_DB_Type["subscription"]) {
    if (await get_group(mail, pswd)) {
        return false; // Le Groupe existe déjà !!
    }

    const currentDate = new Date();
    return Groups.push({ // retourne l'id du Group nouvellement créé
        "id": Groups.length + 1,
        "name": grp_name,
        "password": await hashPassword(pswd),
        "email": mail,
        "created-date": format(currentDate, 'yyyy-MM-dd'),
        "updated-at": format(currentDate, 'yyyy-MM-dd'),
        "subscription": sub
    });
}


export async function update_group(id: Groups_DB_Type["id"], changes: any) {
    let group_data = await get_group_by_id(id);
    if (!group_data) {
        return false; // L'utilisateur n'existe pas ?!
    }

    if (changes["id"] || changes["created-date"]) {
        return false; // Une requête malveillante veut modifier les infos d'id et/ou admin ?!
    }

    group_data.name = changes.Name || group_data.name
    group_data.password = changes.Password || group_data.password
    group_data.email = changes.Mail || group_data.email
    group_data.subscription = changes.Subscription || group_data.subscription
    group_data["updated-at"] = format(new Date(), 'yyyy-MM-dd')

    return true;
}


export async function delete_group(id: Groups_DB_Type["id"]) {
    const group_data = await get_group_by_id(id)
    if (!group_data) {
        return false; // L'utilisateur n'existe pas ?!
    }

    const deleted_group = Groups.splice(group_data.id - 1, 1)
    console.log("Element:", group_data)
    console.log("Deleted:", deleted_group)

    return true;
}