import jwt from 'jsonwebtoken'; // For token-based authentication
import bcrypt from 'bcryptjs';   // For password hashing
import { user_type } from "../models/Schemas/users_schema";
import { group_type } from "../models/Schemas/groups_schema";

export enum Token_Type {
    Access,
    Group,
    User
}

/// Tokens JWT
export const generate_accessToken = async(group_id: group_type["id"]) => {
    return jwt.sign({ id: group_id }, process.env.ACCESS_KEY as string, { expiresIn: '31d' });
  };

export const generate_groupToken = async(group_id: group_type["id"]) => {
  return jwt.sign({ id: group_id }, process.env.GROUP_KEY as string, { expiresIn: '31d' });
};

export const generate_userToken = async(group_id: user_type["group_id"], user_id: user_type["id"]) => {
    return jwt.sign({ id: group_id, usrid: user_id }, process.env.USER_KEY as string, { expiresIn: '1d' });
};

export const decodeToken = async(token: string, type: Token_Type) => {
    let secret_key : string = "";
    if (type === Token_Type.Access) { secret_key = process.env.ACCESS_KEY as string; }
    if (type === Token_Type.Group) { secret_key = process.env.GROUP_KEY as string; }
    if (type === Token_Type.User) { secret_key = process.env.USER_KEY as string; }

    return jwt.verify(token, secret_key);
};



/// Hash Passwords (Bcrypt)
export const hashPassword = async(password: group_type["password"]) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async(passwordCompared: string, hashedPassword: string) => {
    return await bcrypt.compare(passwordCompared, hashedPassword);
};