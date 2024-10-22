// Imports
import { Request, Response, Router } from "express";
import { get_user, get_users_in_group, create_user, update_user, delete_user } from "../models/users_func";

// Types + Validation Middleware
import { user_login_schema, create_user_schema, update_user_schema, user_type } from "../models/Schemas/users_schema";
import { body_data_validation, query_data_validation } from "../middlewares/routes/data_validation";
import { validate_group_id } from "../middlewares/routes/validate_group_id";
import { validate_group_token } from "../middlewares/routes/validate_token";
import { group_login_schema } from "../models/Schemas/groups_schema";
import { get_group, isGroup_Valide } from "../models/groups_func";

// Router
const router = Router()



router.get("/:group_id/users",
    validate_group_token,
    validate_group_id,

    async (req: Request, res: Response) => {
        const group_id = req.params.group_id;
        const { name } = req.query;

        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        if (!name) { // Si 'Name' est vide, envoyé la liste de tous les utilisateurs
            const users_list = await get_users_in_group(group_id)
            if (! users_list) {
                res.sendStatus(504);
            } else {
                res.json({response: await get_users_in_group(group_id)});
            }
            return;
        }

        const User_data = await get_user(group_id as user_type["id"], name as user_type["name"]);
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
        const group_id = req.params.group_id;
        const { name, thumbnail, type } = req.body;

        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        const created = await create_user(group_id as user_type["group_id"], name as user_type["name"], thumbnail as user_type["thumbnail"], type as user_type["type"]);
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
        const group_id = req.params.group_id;
        const { name } = req.query;
        const Changes = req.body;

        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        const user_data = await get_user(group_id, name as user_type["name"]);
        if (! user_data) {
            res.status(404).json({detail: "User not found!"})
            return;
        }

        if (Object.keys(Changes).length == 0) {
            res.status(400).json({detail: "Your body request is empty!"})
            return;
        }


        const updated = await update_user(user_data.id, Changes as Array<user_type["name"] | user_type["thumbnail"]>);
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
        const group_id = req.params.group_id;
        const { name } = req.query;
        const { email, password } = req.body;

        if (req.group?.id !== group_id) {
            res.sendStatus(403); // Quelqu'un essaie de se connecter au groupe sans l'autorisation
            return;
        }

        if (! await isGroup_Valide(req.group, email, password)) {
            res.sendStatus(403); // Mail ou Mot de Passe invalide !
            return;
        }

        const user_target = await get_user(group_id, name as user_type["name"]);
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