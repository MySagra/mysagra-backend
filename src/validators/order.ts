import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const foodSchema = Joi.object({
    foodId: Joi.number().integer().positive(),
    quantity: Joi.number().integer().min(1).required()
})

const orderSchema = Joi.object({
    table: Joi.number().min(0).required(),
    customer: Joi.string().min(1).required(),
    foodsOrdered: Joi.array().items(foodSchema).min(1).required()
})

export const orderIdSchema = Joi.object({
    id: Joi.string().length(3).required()
})

export const validateOrder : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = orderSchema.validate(req.body);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}

export const validateOrderId : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error } = orderIdSchema.validate(req.params);
    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
}