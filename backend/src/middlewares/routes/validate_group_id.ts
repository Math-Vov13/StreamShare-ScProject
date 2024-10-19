import { Request, Response, NextFunction } from "express";
import { get_group_by_id } from "../../models/groups_func"


export const validate_group_id = async (req: Request, res: Response, next: NextFunction) => {
    const group_id = parseInt(req.params.group_id);

    try {
        if (await get_group_by_id(group_id)) { // Si l'Id du groupe existe
            next();
        } else {
            res.status(404).json({detail: "This Group doesn't exists!"});
        }
    } catch (error) {
        res.status(500).json({detail: "Internal Error!"});
    }
}