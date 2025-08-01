//server
import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

//logger
import { LoggerFactory } from './utils/logger/loggerFactory';
import { requestLogger } from './middlewares/requestLogger';

//docs
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

//routes
import loginRoutes from "@/routes/auth/login.route"
import categoryRoutes from "@/routes/category.route"
import foodRoutes from "@/routes/food.routes"
import orderRoutes from "@/routes/order.route"
import roleRoutes from "@/routes/role.route"
import userRoutes from "@/routes/user.route"
import statsRoutes from "@/routes/stats.route"


//app config
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cors({ origin: [`http://localhost:${port}`, `https://${process.env.HOST}`], credentials: true }));

//create logger
const loggerFactory = new LoggerFactory();

//log middleware
app.use(requestLogger(loggerFactory.getLogger()));

//docs
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "../docs/swagger.yaml"), "utf8")
) as any;

// Aggiorna dinamicamente la configurazione del server con le variabili d'ambiente
if (swaggerDocument.servers && swaggerDocument.servers[0]) {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';
  const protocol = host == "localhost" ? "http" : "https";

  swaggerDocument.servers[0].url = `http://localhost:${port}`;
  swaggerDocument.servers[0].description = 'Docker Container local Server';

  swaggerDocument.servers[1].url = `https://${host}:${port}`;
  swaggerDocument.servers[1].description = 'API Server';
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth/login", loginRoutes)
app.use("/categories", categoryRoutes);
app.use("/foods", foodRoutes);
app.use("/orders", orderRoutes);
app.use("/roles", roleRoutes);
app.use("/users", userRoutes);
app.use("/stats", statsRoutes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  console.log(`Documentation: http://localhost:${port}/api-docs`);
});