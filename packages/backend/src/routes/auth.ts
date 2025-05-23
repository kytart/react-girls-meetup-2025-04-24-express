import { Application } from "express";
import { Model } from "../model/model";
import { serializeUser } from "../serialize";
import { generateToken } from "../auth/tokenAuth";
import { authenticateJWT } from "../auth/middleware";
import { comparePassword } from "../auth/password";
import { postAuthBodySchema } from "./validation";
import { asyncHandler } from "./utils";

/**
 * Setup routes related to authentication
 */
export function routeAuth(app: Application, model: Model) {
  /**
   * POST /auth
   * Authenticate user and return JWT token
   */
  app.post(
    "/auth",
    asyncHandler(async (req, res) => {
      const { nickname, password } = postAuthBodySchema.parse(req.body);

      const user = await model.user.getOneByNickname(nickname);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await comparePassword(
        password,
        user.passwordHash
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = generateToken(user.id, user.nickname);

      // Set token as HTTP-only cookie
      res.cookie("Authorization", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      });

      const serializedUser = serializeUser(user);
      res.json(serializedUser);
    })
  );

  /**
   * GET /auth/me
   * Get authenticated user information
   *
   * This route is protected by JWT authentication middleware
   * and returns 401 if the user is not authenticated.
   */
  app.get("/auth/me", authenticateJWT, (req, res) => {
    res.json({
      isAuthenticated: true,
      user: {
        id: req.user!.userId,
        nickname: req.user!.nickname,
      },
    });
  });

  /**
   * POST /logout
   * Logout user by clearing the auth token cookie
   */
  app.post("/logout", (_, res) => {
    res.clearCookie("Authorization");
    res.json({ message: "Logged out successfully" });
  });
}
