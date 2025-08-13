import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";

export const checkUniqueCategoryName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    const category = await prisma.category.findUnique({
        where: {
            name
        }
    });
    
    if (category) {
        res.status(409).json({ message: "Category name already exists, must be unique!" });
        return;
    }
    next();
}

export const checkCategoryExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!category) {
        res.status(404).json({ message: "Food not exists" });
        return;
    }
    next();
}