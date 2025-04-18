import { Application, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Model } from "../model/model";
import { routePost } from "./post";
import { routeAuth } from "./auth";

/**
 * Setup routes for the application
 */
export function routeApp(app: Application, model: Model) {
  app.get("/", (_, res) => {
    res.json({ message: "Backend API is running" });
  });

  routePost(app, model);
  routeAuth(app, model);

  // error handling middleware
  // https://expressjs.com/en/guide/error-handling.html
  app.use((err: unknown, _: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
      // 400 Bad Request means the error is on the client side
      return res.status(400).json({
        message: "Invalid body",
        errors: err.errors.map((error) => ({
          field: error.path.join("."),
          message: error.message,
        })),
      });
    }

    // 500 Internal Server Error means the error is on the server side
    res.status(500).json({ message: "Internal server error" });
  });
}
