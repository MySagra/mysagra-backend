import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required(),
    roleId: Joi.number().integer().min(0).required()
})

export const userIdSchema = Joi.object({
    id: Joi.number().integer().positive()
})

export const validateUser : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}

export const validateUserId : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userIdSchema.validate(req.params);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}