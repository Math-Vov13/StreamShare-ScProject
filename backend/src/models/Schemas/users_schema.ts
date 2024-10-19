import * as yup from "yup";

export const user_schema = yup.object({
    "id": yup.number(),
    "admin": yup.bool().required(),
    "name": yup.string().required(),
    "image": yup.string().url().required(),
    "Type": yup.mixed().oneOf(["Adult", "Children"]).required(),
    "created-date": yup.date(),
    "preferences": yup.array().required(),
    "group-id": yup.number().required()
}).noUnknown()


export const user_login_schema = yup.object({
    Name: yup.string().required()
}).noUnknown()

export const create_user_schema = yup.object({
    Name: yup.string().required(),
    Image: yup.string().required(),
    Type: yup.mixed().oneOf(["Adult", "Children"])
}).noUnknown()

export const update_user_schema = yup.object({
    Name: yup.string().nullable(),
    Image: yup.string().nullable(),
    Preferences: yup.array().nullable()
}).test('at-least-one', 'At least one field must not be null', (value) => {
    // Vérifie si au moins une des valeurs n'est pas null
    return Object.values(value).some(val => val !== null && val !== undefined);
}).noUnknown();