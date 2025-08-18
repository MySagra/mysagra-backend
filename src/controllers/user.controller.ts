import { NextFunction, Request, Response } from "express";

import prisma from "@/utils/prisma";
import hashPwd from "@/lib/hashPwd";
import { asyncHandler } from "@/utils/asyncHandler";

export const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            role: true
        }
    });
    res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            username: true,
            role: true
        }
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json(user);
})

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, roleId } = req.body;

    const newUser = await prisma.user.create({
        data: {
            username,
            password: await hashPwd(password),
            roleId
        },
        select: {
            id: true,
            username: true,
            role: true
        }
    });

    res.status(201).json(newUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = parseInt(req.params.id);

    await prisma.user.delete({
        where: {
            id
        }
    });

    res.status(204).json({
        message: "User deleted"
    });
});