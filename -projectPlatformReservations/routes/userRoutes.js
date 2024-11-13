import User from "../models/User.js";
import express from "express";
import userController from "../controllers/userController.js";

import { expressjwt } from "express-jwt";

import tokenValidation from "../middlewares/validationTokenExists.js";

const router = express.Router();

router.get("/api/users", userController.getAll);
router.get("/api/users/:id", userController.getById);
router.post("/api/users", userController.create);
router.patch("/api/users/:id", expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation , userController.update);
router.delete("/api/users/:id", expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation ,userController.destroy);

export default router;