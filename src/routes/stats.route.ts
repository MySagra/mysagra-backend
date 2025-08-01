import { Router } from "express";
import { checkRole } from "@/middlewares/authMiddleware";
import { getFoodsStats, getOrdersStat, getRevenuePerDay } from "@/controllers/stats.controller";

const router = Router();

router.get(
    '/total-orders',
    checkRole(["admin"]),
    getOrdersStat
)

router.get(
    '/foods-ordered',
    checkRole(["admin"]),
    getFoodsStats
)

router.get(
    '/revenue',
    checkRole(["admin"]),
    getRevenuePerDay
)

export default router;