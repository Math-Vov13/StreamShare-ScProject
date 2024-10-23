// Imports
import { Request, Response, Router } from "express";
import { get_user } from "../models/users_func";

// Types + Validation Middleware
import { validate_group_token } from "../middlewares/routes/validate_token";
import { generate_userToken } from "../utils/auth_func";
import { query_data_validation } from "../middlewares/routes/data_validation";
import { user_login_schema, user_type } from "../models/Schemas/users_schema";

// Router
const router = Router()


export const create_user_token = async (req: Request, res: Response) => {
    const time_age_UserToken = 1 *24 *60 *60 *1000; // ==> 1 jour
    const { name } = req.query;
    // const group_id = req.params.group_id;

    const user_data = await get_user(req.group?.id as user_type["group_id"], name as user_type["name"]);
    if (! user_data) {
        res.sendStatus(404);
        return;
    }
    
    // Cookies
    const accessToken = await generate_userToken(req.group?.id as user_type["group_id"], user_data.id);
    res.cookie("tokenU", accessToken, { maxAge: time_age_UserToken, httpOnly: true })
    
    res.status(201).json({token: accessToken});
    return;
}

router.post("/users/auth",
    validate_group_token,
    query_data_validation(user_login_schema),
    
    create_user_token
)

router.delete("/users/auth",
    validate_group_token,

    async (_req: Request, res: Response) => {  

        // Supprime les cookies
        res.clearCookie("tokenU");
        res.sendStatus(205);

        return;
    }
)


export default router;