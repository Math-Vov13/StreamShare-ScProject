import * as yup from "yup";

export const table_group_name = "Account";

export type group_type = {
    id: string,
    name: string,
    password: string,
    email: string,
    subscription: string,
    created_at: string
}



export const create_group_schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    subscription: yup.string().required()
}).noUnknown();

export const update_group_schema = yup.object({
    name: yup.string().nullable(),
    subscription: yup.string().nullable()
}).test('at-least-one', 'At least one field must not be null', (value) => {
    // Vérifie si au moins une des valeurs n'est pas null
    return Object.values(value).some(val => val !== null && val !== undefined);
}).noUnknown();

export const group_login_schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
}).noUnknown();