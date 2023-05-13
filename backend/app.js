import { config } from "dotenv";
import express from "express";
import userRouter from "./routes/user.js";
import { errorMiddleware } from "./middleware/error.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import morgan from "morgan";
import { logRequests } from "./middleware/logreqs.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");
app.use(logRequests);
app.use(cookieParser());
app.use(morgan("dev"));
config({
  path: "./data/config.env",
});
//Using Middleware
app.use(express.json());
app.use(cors());
//swaggerUI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Using routes
app.use("/api/v1/users", userRouter);

//Using Error Middileware
app.use(errorMiddleware);
