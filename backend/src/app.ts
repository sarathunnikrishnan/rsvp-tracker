import express, { Express } from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { errorHandler } from './middleware/error.middleware';

/**
 * Initializes and configures Express Application instance.
 */
export function createApp(): Express {
  const app = express();

  // Global Middlewares
  app.use(cors());
  app.use(express.json());

  // Mount API Router (includes health check & all sub-routes)
  app.use('/api', apiRouter);

  // Global Error Middleware
  app.use(errorHandler);

  return app;
}
