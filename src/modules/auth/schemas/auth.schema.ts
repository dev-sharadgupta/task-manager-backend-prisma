import { z } from "zod";

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signupSchema = z.object({
    email: z
        .string()
        .min(1, "Eamil is required")
        // .email()
        .regex(emailRegex, "Invalid email address"),

    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and _"),


    password: z
        .string()
        .min(1, "Password is required")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            "Password must contain uppercase, lowercase, number and special character"
        ),
});

export const loginSchema = z.object({
    identifier: z
        .string()
        .min(1, "Email or username is required"),

    password: z
        .string()
        .min(1, "Password is required")
});