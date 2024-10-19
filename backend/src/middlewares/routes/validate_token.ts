import { Request, Response, NextFunction } from "express";
import { get_group_by_id } from "../../models/groups_func";
import { get_user_by_id } from "../../models/users_func";
import { decodeToken } from "../../utils/auth_func";


interface JwtPayload {
    id: number;
}

declare global {
    namespace Express {
        interface Request {
            group?: { id: number };
            user?: { id: number };
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
        const decoded = await decodeToken(token) as JwtPayload;
        if (! await get_group_by_id(decoded.id)) { // TODO: vérifier la date d'expiration aussi
            res.clearCookie("token");
            res.status(403).json({detail: "Your credentials is not valid or is expired!"});
            return; 
        }
        
        req.group = { id: decoded.id }; // Ajoute l'id dans le Headers
        next();

    } catch (error) {
        console.log("Handle Error")
        console.log("Erreur:", error)
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
        const decoded = await decodeToken(token) as JwtPayload;
        if (! await get_user_by_id(decoded.id)) { // TODO: vérifier la date d'expiration aussi
            res.clearCookie("tokenU");
            res.status(403).json({detail: "Your User credentials is not valid or is expired!"});
            return; 
        }
        
        req.user = { id: decoded.id }; // Ajoute l'id dans le Headers
        next();

    } catch (error) {
        res.clearCookie("tokenU");
        res.status(403).json({detail: "Your User credentials is not valid or is expired!"});
        return;
    }
}