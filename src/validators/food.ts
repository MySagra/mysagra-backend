import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const foodSchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string(),
    price: Joi.number().min(0.01).required(),
    available: Joi.boolean().required(),
    categoryId: Joi.number().integer().positive()
})

export const foodIdSchema = Joi.object({
    id: Joi.number().integer().positive()
})

export const validateFood : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = foodSchema.validate(req.body);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}

export const validateFoodId : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = foodIdSchema.validate(req.params);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}