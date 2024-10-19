import { Request, Response, NextFunction } from "express";

export const body_data_validation = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    
    try {
        req.body = await schema.validate(data) || {}
        next();
    } catch (error) {
        res.sendStatus(400);
    }
}

export const query_data_validation = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const data = req.query;
    
    try {
        await schema.validate(data);
        next();
    } catch (error) {
        res.sendStatus(400);
    }
}