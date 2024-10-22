import { Request, Response, NextFunction } from "express";
import { get_group_by_id } from "../../models/groups_func";
import { group_type } from "../../models/Schemas/groups_schema";
import { user_type } from "../../models/Schemas/users_schema";
import { get_user_by_id } from "../../models/users_func";
import { decodeToken, Token_Type } from "../../utils/auth_func";

interface JwtPayload {
    id: group_type["id"];
    usrid: user_type["id"];
}

declare global {
    namespace Express {
        interface Request {
            group?: group_type;
            user?: user_type;
        }
    }
}


export const validate_group_token = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    // let token;
    // if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
    //     token = req.headers['authorization'].split(' ')[1];
    // }
    // if (!token) {
    //     res.status(401).json({detail: "You need to add a valid credentials!"});
    //     return;
    // }

    if (!token) {
        res.status(401).json({detail: "You need to add a valid credentials!"});
        return;
    }

    try {
        const decoded = await decodeToken(token, Token_Type.Group) as JwtPayload;
        const active_group = await get_group_by_id(decoded.id);
        if (! active_group) { // Token invalide ou expiré
            res.clearCookie("token");
            res.status(403).json({detail: "Your credentials is not valid or is expired!"});
            return; 
        }

        req.group = active_group; // Ajoute les data du groupe dans le Headers
        next();

    } catch (error) {
        res.clearCookie("token");
        res.status(403).json({detail: "Your credentials is not valid or is expired!"});
        return;
    }
}


export const validate_user_token = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.tokenU;

    if (!token) {
        res.status(401).json({detail: "You need to add a valid User credentials!"});
        return;
    }


    try {
        const decoded = await decodeToken(token, Token_Type.User) as JwtPayload;
        const active_user = await get_user_by_id(decoded.usrid);
        if (! active_user) { // Token invalide ou expiré
            res.clearCookie("tokenU");
            res.status(403).json({detail: "Your User credentials is not valid or is expired!"});
            return; 
        }
        
        req.user = active_user; // Ajoute l'id dans le Headers
        next();

    } catch (error) {
        res.clearCookie("tokenU");
        res.status(403).json({detail: "Your User credentials is not valid or is expired!"});
        return;
    }
}