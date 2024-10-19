import jwt from 'jsonwebtoken'; // For token-based authentication
import bcrypt from 'bcryptjs';   // For password hashing


/// Tokens JWT
export const generate_groupToken = async(group_id: number) => {
  return jwt.sign({ id: group_id }, process.env.SECRET_KEY as string, { expiresIn: '31d' });
};

export const generate_userToken = async(group_id: number, user_id: number) => {
    return jwt.sign({ id: group_id, usrid: user_id }, process.env.SECRET_KEY as string, { expiresIn: '1d' });
};

export const decodeToken = async(token: string) => {
    return jwt.verify(token, process.env.SECRET_KEY as string);
};



/// Hash Passwords (Bcrypt)
export const hashPassword = async(password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async(passwordCompared: string, hashedPassword: string) => {
    return await bcrypt.compare(passwordCompared, hashedPassword);
};