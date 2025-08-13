import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const pageSchema = Joi.object({
    page: Joi.number().integer().min(0)
})

export const validatePage : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = pageSchema.validate(req.params);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}