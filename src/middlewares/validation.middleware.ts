import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export function validateData(
    schema: z.ZodTypeAny,
    type: "body" | "query" | "params" = "body"
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[type]);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => {
                const path = issue.path.join(".");
                return path ? `${path}: ${issue.message}` : issue.message;
            });

            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                errors,
            });
        }

        // attach validated data (optional but recommended)
        req[type] = result.data;
        next();
    };
}
