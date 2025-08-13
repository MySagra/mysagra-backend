import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string().min(1).required(),
    available: Joi.bool().required(),
    position: Joi.number().integer().required()
})

const categoryIdSchema = Joi.object({
    id: Joi.number().integer().positive()
})

export const validateCategory : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categorySchema.validate(req.body);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}

export const validateCategoryId : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryIdSchema.validate(req.params);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}