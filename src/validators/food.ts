import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

export const createFoodSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().min(1).required(),
        description: Joi.string(),
        price: Joi.number().min(0.01).required(),
        available: Joi.boolean().required(),
        categoryId: Joi.number().integer().positive()
    })
})

export const idFoodSchema = Joi.object({
    params: Joi.object({
        id: Joi.number().integer().positive()
    })
})

export const updateFoodSchema = Joi.object({
    createFoodSchema,
    idFoodSchema
})