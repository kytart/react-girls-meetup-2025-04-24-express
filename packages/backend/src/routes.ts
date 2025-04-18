import { Application } from "express";
import { Model } from "./model/model";
import { routePost } from "./routes/post";

/**
 * Setup routes for the application
 */
export function routeApp(app: Application, model: Model) {
  app.get("/", (_, res) => {
    res.json({ message: "Backend API is running" });
  });

  routePost(app, model);
}
