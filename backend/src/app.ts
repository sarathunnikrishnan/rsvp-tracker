import express, { Express } from "express";
import cors from "cors";
import apiRouter from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { renderStatusPage } from "./helpers/status-page.helper";

/**
 * Initializes and configures Express Application instance.
 */
export function createApp(): Express {
  const app = express();

  // Global Middlewares
  app.use(cors());
  app.use(express.json());

  // Root Landing Page
  app.get("/", (req, res) => {
    if (req.accepts("html")) {
      res.setHeader("Content-Type", "text/html");
      return res.status(200).send(renderStatusPage());
    }
    res
      .status(200)
      .json({ status: "ok", message: "Dexqbit RSVP Tracker API Operational" });
  });

  // Mount API Router (includes health check & all sub-routes)
  app.use("/api", apiRouter);

  // Global Error Middleware
  app.use(errorHandler);

  return app;
}
