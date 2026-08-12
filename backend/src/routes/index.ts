import { Router } from 'express';
import authRoutes from './auth.routes';
import eventRoutes from './event.routes';
import rsvpRoutes from './rsvp.routes';

import { renderStatusPage } from '../helpers/status-page.helper';

const apiRouter = Router();

/**
 * Root API Endpoint — Renders operational status page or JSON status
 */
apiRouter.get('/', (req, res) => {
  if (req.accepts('html')) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(renderStatusPage());
  }
  res.status(200).json({ status: 'ok', message: 'Dexqbit RSVP Tracker API Operational' });
});

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
