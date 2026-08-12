import { Router } from 'express';
import authRoutes from './auth.routes';
import eventRoutes from './event.routes';
import rsvpRoutes from './rsvp.routes';

const apiRouter = Router();

/**
 * Healthcheck Endpoint
 */
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Domain-specific API Routes
 */
apiRouter.use('/auth', authRoutes);
apiRouter.use('/events', eventRoutes);
apiRouter.use('/rsvps', rsvpRoutes);

export default apiRouter;
