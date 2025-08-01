import { getJWTPayload } from '@/lib/JWT';
import { Request, Response, NextFunction } from 'express';

export function checkRole(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "Unauthroized" });
            return;
        }

        const token = authHeader.split(" ")[1];

        let payload = getJWTPayload(token);

        if (payload) {
            if (!roles.includes(payload.role.name)) {
                res.status(403).json({ error: "Role unauthorized" });
                return
            }
        }
        else {
            res.status(401).json({ error: "Not valid token" });
            return
        }

        next();
    };
}