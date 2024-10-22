import { Request, Response, Router } from "express";
import { create_group, update_group } from "../models/groups_func";
import { validate_group_token } from "../middlewares/routes/validate_token";
import { body_data_validation } from "../middlewares/routes/data_validation";
import { create_group_schema, update_group_schema, group_login_schema, group_type } from "../models/Schemas/groups_schema";

const router = Router()



router.get("/",
    validate_group_token,
    
    async (req: Request, res: Response) => {
        // const group_data = await get_group_by_id(req.group?.id as string);

        // if (! group_data) { res.sendStatus(404); return; }; // Not Found!
        res.json({response: req.group?.id});
        
        return;
    }
);


router.post("/",
    body_data_validation(create_group_schema),

    async (req: Request, res: Response) => {
        const { Name, Mail, Password, Subscription } = req.body;

        const created = await create_group(Name as group_type["name"], Password as group_type["password"], Mail as group_type["email"], Subscription as group_type["subscription"]);
        if (created) {
            // Supprime les cookies
            res.clearCookie("refresh");
            res.clearCookie("token");
            res.clearCookie("tokenU");

            res.status(201).json({detail: "Group created!"})
            return;
        } else {
            res.status(409).json({detail: "Your request can't be handled!"})
            return;
        };
    }
);


router.put("/",
    validate_group_token,
    body_data_validation(update_group_schema),

    async (req: Request, res: Response) => {
        const Changes = req.body;

        const updated = await update_group(req.group?.id as group_type["id"], Changes as Array<group_type["name"] | group_type["email"] | group_type["password"] | group_type["subscription"]>);
        if (updated) {
            res.status(200).json({detail: "Group updated!"})
            return;
        } else {
            res.status(409).json({detail: "Your request can't be handled!"})
            return;
        };
    }
);


router.delete("/",
    validate_group_token,
    body_data_validation(group_login_schema),
    
    async (_: Request, res: Response) => {
        // TODO: utiliser une requête SQL directement...
        res.status(403).json({detail: "This method is only reserved to our Internal Services!"});
        return;
    }
);


export default router;