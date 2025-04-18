import jwt from 'jsonwebtoken';

// JWT secret key - in a real application, this should be in environment variables
const JWT_SECRET = 'your-secret-key-should-be-in-env-vars';

const TOKEN_EXPIRATION = '1h';

/**
 * Generate a JWT token for a user
 * @param userId User ID to include in the token
 * @param nickname User's nickname to include in the token
 * @returns JWT token string
 */
export function generateToken(userId: number, nickname: string): string {
  return jwt.sign(
    {
      userId,
      nickname
    },
    JWT_SECRET,
    {
      expiresIn: TOKEN_EXPIRATION
    }
  );
}

/**
 * Verify a JWT token
 * @param token JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export function verifyToken(token: string): { userId: number; nickname: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; nickname: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from authorization header
 * @param authHeader Authorization header value
 * @returns Token string or null if not found/valid
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}