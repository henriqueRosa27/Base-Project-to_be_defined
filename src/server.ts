import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';

import { RegisterRoutes } from '../build/routes';
import AppError from './app/application/errors/AppError';
import uploadConfig from './config/multer';

import 'dotenv/config';
import './database';

const app = express();

app.use(cors());

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());

RegisterRoutes(app);

app.use('/files', express.static(uploadConfig.directory));

app.use(function notFoundHandler(_req, res: Response) {
  res.status(404).send({
    message: 'Not Found',
  });
});

app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof AppError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.message);
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      err: err.message,
    });
  }

  next();
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started!');
});
