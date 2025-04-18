import { Application } from "express";
import { serializePost } from "@signageos/sample-app-common/src/post";
import { Model } from "../model/model";
import { authenticateJWT } from "../auth/middleware";
import { postPostBodySchema } from "./validation";

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

  /**
   * POST /post
   * Create a new post
   *
   * This route is protected by JWT authentication middleware
   * and returns 401 if the user is not authenticated.
   */
  app.post("/post", authenticateJWT, async (req, res) => {
    const { content } = postPostBodySchema.parse(req.body);

    // Validate required fields
    if (!content) {
      return res
        .status(400)
        .json({ error: "Content and author nickname are required" });
    }

    await model.post.create({
      content,
      authorNickname: req.user!.nickname,
      createdAt: new Date(),
    });

    res.sendStatus(201);
  });
}
