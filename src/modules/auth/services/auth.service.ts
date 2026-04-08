import { prisma } from "../../../../lib/prisma.js";
import * as bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { APIError } from "../../../middlewares/errorHandler.js";

export const signupUser = async (
    username: string,
    email: string,
    password: string
) => {

    // Check if username already exists
    const existingUserName = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUserName) {
        throw new APIError("Username already taken", StatusCodes.CONFLICT);
    }

    // Check if email already exists
    const existEmail = await prisma.user.findUnique({
        where: { email },
    });

    if (existEmail) {
        throw new APIError("Email already exists", StatusCodes.CONFLICT);
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            username: true,
            email: true,
        },
    });

    return user;
};


export const loginUser = async (
    identifier: string,
    password: string
) => {

    // Find user by email or username
    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: identifier }, { username: identifier }],
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
        }
    });

    if (!user) {
        throw new APIError("Invalid credentials", StatusCodes.NOT_FOUND);
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new APIError("Incorrect Password", StatusCodes.NOT_FOUND);
    }

    return user;
};

export const getUserById = async (
    userId: number
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            email: true
        }
    });

    if (!user) {
        throw new APIError("User Not found", StatusCodes.NOT_FOUND);
    }

    return user;
}