import { Request, Response, NextFunction } from "express";

export const validatePage = (req: Request, res: Response, next: NextFunction): void => {
    const { page } = req.params;
    if (!page || isNaN(Number(page)) || Number(page) <= 0) {
        res.status(400).json({ error: "Not valid page" });
        return;
    }
    next();
}