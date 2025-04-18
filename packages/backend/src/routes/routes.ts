import { Application } from "express";
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
}
