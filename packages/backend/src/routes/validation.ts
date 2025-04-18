import z from 'zod';

/**
 * Body validation schema for the POST /auth endpoint.
 */
export const postAuthBodySchema = z.strictObject({
	nickname: z.string().min(1, { message: "Nickname is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

/**
 * Body validation schema for the POST /post endpoint.
 */
export const postPostBodySchema = z.strictObject({
	content: z.string().min(1, { message: "Content is required" }),
});
