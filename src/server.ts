import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import AppError from "./errors/AppError";
import routes from "./routes/index";
import uploadConfig from "./config/multer";

import "dotenv/config";
import "./database";

const app = express();

app.use("/files", express.static(uploadConfig.directory));

app.use(cors());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.log(err);
  return response.status(500).json({
    status: "error",
    message: "Erro inesperado",
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log("Server started!");
});
