import express from "express";
import { signup, login, getUserProfile, logout } from "../controllers/auth.controller.js";
import { validateData } from "../../../middlewares/validation.middleware.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import { authenticateJWT } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/signup",
    validateData(signupSchema),
    signup
);

router.post(
    "/login",
    validateData(loginSchema),
    login
);

router.get(
    "/me",
    authenticateJWT,
    getUserProfile
);

router.post(
    "/logout",
    logout
);

export default router;