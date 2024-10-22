// Imports
import { Request, Response, Router } from "express";
import { get_user } from "../models/users_func";

// Types + Validation Middleware
import { validate_group_token } from "../middlewares/routes/validate_token";
import { generate_userToken } from "../utils/auth_func";
import { validate_group_id } from "../middlewares/routes/validate_group_id";
import { query_data_validation } from "../middlewares/routes/data_validation";
import { user_login_schema, user_type } from "../models/Schemas/users_schema";

// Router
const router = Router()



router.post("/:group_id/users/auth",
    validate_group_token,
    validate_group_id,
    query_data_validation(user_login_schema),
    
    async (req: Request, res: Response) => {
        const time_age_UserToken = 1 *24 *60 *60 *1000; // ==> 1 jour
        const { Name } = req.query;
        const group_id = req.params.group_id;

        // Security
        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        const user_data = await get_user(group_id as user_type["group_id"], Name as user_type["name"]);
        if (! user_data) {
            res.sendStatus(404);
            return;
        }
        
        // Cookies
        const accessToken = await generate_userToken(group_id as user_type["group_id"], user_data.id);
        res.cookie("tokenU", accessToken, { maxAge: time_age_UserToken, httpOnly: true })
        
        res.sendStatus(201);
        return;
    }
)

router.delete("/:group_id/users/auth",
    validate_group_token,
    validate_group_id,

    async (req: Request, res: Response) => {
        const group_id = req.params.group_id;

        // Security
        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }
    

        // Supprime les cookies
        res.clearCookie("tokenU");
        res.sendStatus(205);

        return;
    }
)


export default router;