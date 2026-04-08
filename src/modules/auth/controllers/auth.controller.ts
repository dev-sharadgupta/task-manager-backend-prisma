import { NextFunction, Request, Response } from "express";
import { signupUser, loginUser, getUserById } from "../services/auth.service.js";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../../../utils/jwt.js";
import { clearAuthCookie, setAuthCookie } from "../../../utils/cookie.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const user = await signupUser(username, email, password);

        return res.status(StatusCodes.CREATED).json({
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { identifier, password } = req.body;

        const user = await loginUser(identifier, password);

        // Generate the Token
        const payload = { userId: user.id };
        const token = generateToken(payload);

        // Set Token in HttpsOnly Cookies
        setAuthCookie(res, token);

        return res.status(StatusCodes.OK).json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getUserProfile = async (req: any, res: Response, next: NextFunction) => {
    try {

        // Get the userId from the token
        const userId = req.userId;

        const user = await getUserById(userId);

        return res.status(StatusCodes.OK).json({
            message: "User Found",
            user
        });

    } catch {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch user",
        });
    }
}

export const logout = (req: Request, res: Response) => {
    clearAuthCookie(res); // Clear the Cookie

    return res.status(StatusCodes.OK).json({
        message: "Logged out Successfully",
    });
}