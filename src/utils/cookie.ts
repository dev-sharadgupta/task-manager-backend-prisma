import { Response } from "express";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const setAuthCookie = (res: Response, token: string) => {
    res.cookie("token", token, cookieOptions);
};

export const clearAuthCookie = (res: Response) => {
    res.clearCookie("token", cookieOptions);
};