// Imports
import { Router, Request, Response } from "express";
import { get_group } from "../models/groups_func";

import { body_data_validation } from "../middlewares/routes/data_validation";
import { group_login_schema } from "../models/Schemas/groups_schema";
import { generate_groupToken } from "../utils/auth_func";


const router = Router()


export const create_token = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const time_age_RefreshToken = 365 *24 *60 *60 *1000; // ==> 1 an
    const time_age_AccessToken = 31 *24 *60 *60 *1000; // ==> 1 mois


    // Sécurité
    const group_data = await get_group(email as string, password as string);
    if (!group_data) {
        // Supprime les cookies
        res.clearCookie("refresh");
        res.clearCookie("token");
        res.clearCookie("tokenU");

        res.sendStatus(404);
        return;
    }
    
    
    // Cookies
    const refreshToken = "AccessToken!";
    const accessToken = await generate_groupToken(group_data.id);
    res.cookie("refresh", refreshToken, { maxAge: time_age_RefreshToken, httpOnly: true, secure: true, sameSite: "strict" })
    res.cookie("token", accessToken, { maxAge: time_age_AccessToken, httpOnly: true, secure: true, sameSite: "strict" })
    
    res.status(201).json({token: accessToken});
    return;
}

router.post('/', body_data_validation(group_login_schema), create_token);


router.delete('/', async (_: Request, res: Response) => { // Logout
    // Supprime les cookies
    res.clearCookie("refresh");
    res.clearCookie("token");
    res.clearCookie("tokenU");
    
    res.sendStatus(205);
    return;
});


export default router;