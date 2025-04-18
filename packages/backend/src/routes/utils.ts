import { NextFunction, Request, Response } from "express";

/**
 * Wraps async handler functions to catch errors and pass them to the next middleware
 * 
 * We need this because Express does not handle async errors by default.
 * @see https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware
 */
export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		return fn(req, res, next).catch(next);
	};
}
