import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";

export const checkUniqueFoodName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;
    const { id } = req.params;

    const food = await prisma.food.findUnique({
        where: {
            name
        }
    });

    if ((!id && food) || (food && id && id != food.id.toString())) {
        res.status(409).json({ message: "Food name already exists, must be unique!" });
        return;
    }
    next();
}

export const checkFoodExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const food = await prisma.food.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!food) {
        res.status(404).json({ message: "Food not exists" });
        return;
    }
    next();
}