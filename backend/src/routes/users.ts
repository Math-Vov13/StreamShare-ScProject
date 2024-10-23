// Imports
import { Request, Response, Router } from "express";
import { get_user, get_users_in_group, create_user, update_user, delete_user, get_user_by_id } from "../models/users_func";
import { create_user_token } from "../routes/auth_users";

// Types + Validation Middleware
import { user_login_schema, create_user_schema, update_user_schema, user_type, secured_users_type } from "../models/Schemas/users_schema";
import { body_data_validation, query_data_validation } from "../middlewares/routes/data_validation";
import { validate_group_token } from "../middlewares/routes/validate_token";
import { group_login_schema, group_type } from "../models/Schemas/groups_schema";
import { get_group, isGroup_Valide } from "../models/groups_func";
import { decodeToken, Token_Type } from "../utils/auth_func";

// Router
const router = Router()



interface JwtPayload {
    id: group_type["id"];
    usrid: user_type["id"];
}


router.get("/users",
    validate_group_token,

    async (req: Request, res: Response) => {
        const { name } = req.query;
        console.log("GET /users")

        // Retourne tous les utilisateurs
        if (!name) { // Si 'Name' est vide, envoyé la liste de tous les utilisateurs
            console.log("Cookies:", req.cookies)
            const user_token: string | null = req.cookies["tokenU"]
            console.log("Cookie:", user_token)
            if (user_token) {
                const decoded_token = await decodeToken(user_token as string, Token_Type.User) as JwtPayload
                console.log("Decoded:", decoded_token)
                const User_data = await get_user_by_id(decoded_token.usrid as user_type["id"])
                console.log("User:", User_data)

                if (!User_data) {
                    res.status(404).json({detail: "User not found!"})
                    return;
                } else {
                    res.json({response: User_data});
                    return;
                }
            }

            const users_list = await get_users_in_group(req.group?.id as group_type["id"])
            if (! users_list) {
                res.sendStatus(504);
            } else {
                let secured_user_list : Array<secured_users_type> = Array();
                users_list.forEach((element) => {
                    secured_user_list.push(
                        {
                            name: element.name,
                            thumbnail: element.thumbnail,
                            type: element.type,
                            admin: element.admin
                        }
                    )
                })

                res.json({response: secured_user_list});
            }
            return;
        }

        // Retourne les data d'un utilisateur
        const User_data = await get_user(req.group?.id as group_type["id"], name as user_type["name"])
        if (!User_data) {
            res.status(404).json({detail: "User not found!"})
            return;
        } else {
            res.json({response: User_data});
            return;
        }
    }
);


router.post("/users",
    validate_group_token,
    body_data_validation(create_user_schema),
    

    async (req: Request, res: Response) => {
        const { name, thumbnail, type } = req.body;
        console.log("POST /users")

        const created = await create_user(req.group?.id as group_type["id"], name as user_type["name"], thumbnail as user_type["thumbnail"], type as user_type["type"]);
        if (created) {

            // req.query = { name: name }
            // await create_user_token(req, res); // Créer le cookie
            res.status(201).send({detail: "User created!"});
            return;
        } else {
            res.status(409).send({detail: "Your request can't be handled!"});
            return;
        };
    }
);


router.put("/users",
    validate_group_token,
    query_data_validation(user_login_schema),
    body_data_validation(update_user_schema),

    async (req: Request, res: Response) => {
        const { name } = req.query;
        const Changes = req.body;

        const user_data = await get_user(req.group?.id as group_type["id"], name as user_type["name"]);
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


router.delete("/users",
    validate_group_token,
    query_data_validation(user_login_schema),
    body_data_validation(group_login_schema),
    
    async (req: Request, res: Response) => {
        const { name } = req.query;
        const { email, password } = req.body;

        if (! await isGroup_Valide(req.group as group_type, email, password)) {
            res.sendStatus(403); // Mail ou Mot de Passe invalide !
            return;
        }

        const user_target = await get_user(req.group?.id as group_type["id"], name as user_type["name"]);
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