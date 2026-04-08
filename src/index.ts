import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Root Route
app.get("/", (_req, res) => {
    res.send("Server running ");
});

// Auth Route
app.use("/api/auth", authRoutes);

// Global error handler — must be last middleware
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});