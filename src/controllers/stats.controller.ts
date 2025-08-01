import { Request, Response } from "express";

import prisma from "@/utils/prisma";

export const getOrdersStat = async (req: Request, res: Response): Promise<void> => {
  try {
    const total = await prisma.order.count()

    const result = await prisma.$queryRaw<
      { day: Date; count: bigint }[]
    >`
            SELECT 
                DATE(dateTime) as day, 
                COUNT(*) as count
            FROM orders
            GROUP BY day
            ORDER BY day ASC
        `;

    const safeResult = result.map(r => ({
      day: r.day,
      count: Number(r.count)
    }));

    res.status(200).json({
      totalOrders: total,
      ordersPerDay: safeResult
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getFoodsStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<
      { food: string; quantity: number; price: number }[]
      >`
        SELECT 
          f.name AS food,
          SUM(fo.quantity) AS quantity,
          SUM(fo.quantity * f.price) AS price
        FROM FoodsOrdered fo
        JOIN Food f ON fo.foodId = f.id
        GROUP BY f.name
        ORDER BY quantity DESC;
      `;

    result.map(r => ({
      food: r.food,
      quantity: Number(r.quantity),
      price: Number(r.price)
    }));

    res.status(200).json({
      foodOrdered: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRevenuePerDay = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<
      { day: string; revenue: number }[]
    >`
      SELECT 
        DATE(o.dateTime) AS day,
        SUM(fo.quantity * f.price) AS revenue
      FROM orders o
      JOIN FoodsOrdered fo ON fo.orderId = o.id
      JOIN Food f ON fo.foodId = f.id
      GROUP BY day
      ORDER BY day ASC;
    `;

    const safeResult = result.map(r => ({
      day: r.day,
      revenue: Number(r.revenue)
    }));

    res.status(200).json({
      revenuePerDay: safeResult
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};