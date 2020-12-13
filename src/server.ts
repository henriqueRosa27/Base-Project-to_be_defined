import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';

import { RegisterRoutes } from '../build/routes';
import AppError from './errors/AppError';
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

app.use(
  (err: Error, _request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.log(err);
    return response.status(500).json({
      status: 'error',
      message: 'Erro inesperado',
    });
  }
);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started!');
});
