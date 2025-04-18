import { Application } from "express";
import { serializePost } from "@signageos/sample-app-common/src/post";
import { Model } from "../model/model";

/**
 * Setup routes related to posts
 */
export function routePost(app: Application, model: Model) {
  /**
   * GET /post
   * Get list of posts
   */
  app.get("/post", async (req, res) => {
    const posts = await model.post.getList();
    const serializedPosts = posts.map(serializePost);
    res.json(serializedPosts);
  });
}
