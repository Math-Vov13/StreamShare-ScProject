import * as yup from "yup";

export const table_user_name = "Users";

enum account_type {
    Adult,
    Children
}

export type user_type = {
    id: string,
    name: string,
    thumbnail: string,
    admin: boolean,
    type: account_type,
    interests: Array<string>,
    created_at: string,
    updated_at: string,
    group_id: string
}



export const user_login_schema = yup.object({
    name: yup.string().required()
}).noUnknown()

export const create_user_schema = yup.object({
    name: yup.string().required(),
    thumbnail: yup.string().notRequired(), // si n'est pas fournit = 'undefined' ==> basique thumbnail
    type: yup.mixed().oneOf(["Adult", "Children"])
}).noUnknown()

export const update_user_schema = yup.object({
    name: yup.string().nullable(),
    thumbnail: yup.string().nullable()
}).test('at-least-one', 'At least one field must not be null', (value) => {
    // Vérifie si au moins une des valeurs n'est pas null
    return Object.values(value).some(val => val !== null && val !== undefined);
}).noUnknown();