import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Authorization token missing",
        });
    }

    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;
        
        (req as any).userId = decode.userId;
        next();
    } catch (error: any) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Token expired",
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid token"
            });
        }

        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Authentication failed",
        });
    }
};