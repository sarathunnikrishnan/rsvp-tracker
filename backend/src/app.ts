import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import rsvpRoutes from './routes/rsvp.routes';
import { errorHandler } from './middleware/error.middleware';

/**
 * Initializes and configures Express Application instance.
 */
export function createApp(): Express {
  const app = express();

  // Global Middlewares
  app.use(cors());
  app.use(express.json());

  // Healthcheck Endpoint
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/rsvps', rsvpRoutes);

  // Global Error Middleware
  app.use(errorHandler);

  return app;
}
