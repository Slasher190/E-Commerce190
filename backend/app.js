import { config } from "dotenv";
import express from "express";
import userRouter from "./routes/userRoute.js";
import { errorMiddleware } from "./middleware/error.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import morgan from "morgan";
import { logRequests } from "./middleware/logreqs.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
export const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");
config({
  path: "./data/config.env",
});
//Using Middleware
app.use(fileUpload());
app.use(logRequests);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
//swaggerUI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Using routes
app.use("/api/v1", userRouter);

//Using Error Middileware
app.use(errorMiddleware);