import { Request, Response, NextFunction } from "express";
import { get_content_by_id } from "../../models/media_func";


export const validate_content_id = async (req: Request, res: Response, next: NextFunction) => {
    const content_id = parseInt(req.params.content_id);

    try {
        if (await get_content_by_id(content_id)) { // Si l'Id du média existe
            next();
        } else {
            res.status(404).json({detail: "This Content doesn't exists!"});
        }
    } catch (error) {
        res.status(500).json({detail: "Internal Error!"});
    }
}