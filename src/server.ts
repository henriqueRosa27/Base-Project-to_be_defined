import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import AppError from './errors/AppError';
import routes from './routes/index';

import 'dotenv/config';
import './database';

const app = express();
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Erro inesperado',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started!');
});
