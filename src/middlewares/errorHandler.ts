import type { Request, Response, NextFunction } from "express";

export class APIError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof APIError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack,
        }),
    });
};