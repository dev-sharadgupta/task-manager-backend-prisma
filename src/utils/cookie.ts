import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? "none" as const : "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const setAuthCookie = (res: Response, token: string) => {
    res.cookie("token", token, cookieOptions);
};

export const clearAuthCookie = (res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
};