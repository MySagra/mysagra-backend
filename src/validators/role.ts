import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const roleSchema = Joi.object({
    name: Joi.string().min(1).required(),
    available: Joi.bool().required(),
    position: Joi.number().integer().required()
})

export const roleIdSchema = Joi.object({
    id: Joi.number().integer().positive()
})

export const validateRole : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = roleSchema.validate(req.body);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}

export const validateRoleId : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = roleIdSchema.validate(req.params);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}