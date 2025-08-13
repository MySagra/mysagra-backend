//server
import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import compression = require('compression');
import { errorHandler } from './middlewares/errorHandler';
import { limiter } from './middlewares/limiter';
import path from "path";

dotenv.config();

//docs
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './docs/swagger';

//routes
import loginRouter from "@/routes/auth/login.route"
import categoryRouter from "@/routes/category.route"
import foodRouter from "@/routes/food.routes"
import orderRouter from "@/routes/order.route"
import roleRouter from "@/routes/role.route"
import userRouter from "@/routes/user.route"
import statsRouter from "@/routes/stats.route"
import { requestId } from './middlewares/requestId';
import { loggingMiddleware } from './middlewares/logging';

//app config
const app = express();
const port = process.env.PORT;

//trust nginx
if (process.env.NODE_ENV === "production") {
  app.set('trust proxy', 1); //trust nginx reverse proxy
}

//global middlwares
app.use(express.json({ limit: "10kb" }));
app.use(cors({ origin: [`http://localhost:${port}`, `https://${process.env.HOST}`], credentials: true }));
app.use(requestId);
app.use(limiter);
app.use(loggingMiddleware);
app.use(compression());

//static routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

//routes
app.use("/v1/auth/login", loginRouter)
app.use("/v1/categories", categoryRouter);
app.use("/v1/foods", foodRouter);
app.use("/v1/orders", orderRouter);
app.use("/v1/roles", roleRouter);
app.use("/v1/users", userRouter);
app.use("/v1/stats", statsRouter);

//error middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  console.log(`Documentation: http://localhost:${port}/api-docs`);
});