import TypeUser from "../models/TypeUser.js";
import express from "express";
import { expressjwt } from "express-jwt";
import reservationController from "../controllers/reservationController.js";

import tokenValidation from "../middlewares/validationTokenExists.js";

const router = express.Router();

router.get("/api/reservation", expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation ,reservationController.getAll);
router.get("/api/reservation/:id",expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation ,reservationController.getById);
router.post("/api/reservation", expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation, reservationController.create);
router.patch("/api/reservation/:id" , expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation ,reservationController.update);
router.delete("/api/reservation/:id" , expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation , reservationController.destroy);

export default router;