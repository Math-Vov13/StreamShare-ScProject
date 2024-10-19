// Imports
import { Request, Response, Router } from "express";
import { get_user, get_users_in_group, create_user, update_user, delete_user } from "../models/users_func";

// Types + Validation Middleware
import { user_login_schema, create_user_schema, update_user_schema } from "../models/Schemas/users_schema";
import { body_data_validation, query_data_validation } from "../middlewares/routes/data_validation";
import { validate_group_id } from "../middlewares/routes/validate_group_id";
import { validate_group_token } from "../middlewares/routes/validate_token";
import { group_login_schema } from "../models/Schemas/groups_schema";
import { get_group } from "../models/groups_func";

// Router
const router = Router()



router.get("/:group_id/users",
    validate_group_token,
    validate_group_id,

    async (req: Request, res: Response) => {
        const group_id = parseInt(req.params.group_id);
        const { Name } = req.query;

        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        if (!Name) { // Si 'Name' est vide, envoyé la liste de tous les utilisateurs
            res.json({response: await get_users_in_group(group_id)});
            return;
        }

        const User_data = await get_user(group_id as number, Name as string);
        if (!User_data) {
            res.status(404).json({detail: "User not found!"})
            return;
        } else {
            res.json({response: {id: User_data.id}});
            return;
        }
    }
);


router.post("/:group_id/users",
    validate_group_token,
    validate_group_id,
    body_data_validation(create_user_schema),

    async (req: Request, res: Response) => {
        const group_id = parseInt(req.params.group_id);
        const { Name, ProfileImage, Type } = req.body;

        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        const created = await create_user(group_id as number, Name as string, ProfileImage as string, Type as string);
        if (created) {
            res.status(201).send({detail: "User created!"});
            return;
        } else {
            res.status(409).send({detail: "Your request can't be handled!"});
            return;
        };
    }
);


router.put("/:group_id/users",
    validate_group_token,
    validate_group_id,
    query_data_validation(user_login_schema),
    body_data_validation(update_user_schema),

    async (req: Request, res: Response) => {
        const group_id = parseInt(req.params.group_id);
        const { Name } = req.query;
        const Changes = req.body;

        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        const user_data = await get_user(group_id, Name as string);
        if (! user_data) {
            res.status(404).json({detail: "User not found!"})
            return;
        }

        if (Object.keys(Changes).length == 0) {
            res.status(400).json({detail: "Your body request is empty!"})
            return;
        }


        const updated = await update_user(user_data.id, Changes as any);
        if (updated) {
            res.status(200).send({detail: "User updated!"})
        } else {
            res.status(409).send({detail: "Your request can't be handled!"})
        }
    }
)


router.delete("/:group_id/users",
    validate_group_token,
    validate_group_id,
    query_data_validation(user_login_schema),
    body_data_validation(group_login_schema),
    
    async (req: Request, res: Response) => {
        const group_id = parseInt(req.params.group_id);
        const { Name } = req.query;
        const { Mail, Password } = req.body;

        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        const group_found = await get_group(Mail, Password);
        if (group_found?.id !== req.group?.id) { // Mail ou Password du groupe non valide!
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        const user_target = await get_user(group_id, Name as string);
        if (! user_target) {
            res.status(404).json({detail: "User not found!"})
            return;
        }

        if (user_target?.admin == true) {
            res.status(403).json({detail: "You can't delete Admin user!"})
            return;
        }


        const deleted = await delete_user(user_target.id);
        if (deleted) {
            res.status(200).send({detail: "User deleted!"})
        } else {
            res.status(409).send({detail: "Your request can't be handled!"})
        }
    }
)


export default router;