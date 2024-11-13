import Service from "../models/Service.js";
import express from "express";
import serviceController from "../controllers/serviceController.js";

import { expressjwt } from "express-jwt";

import upload from "../config/multerConfig.js";
import tokenValidation from "../middlewares/validationTokenExists.js";

const router = express.Router();

router.get("/api/services" ,serviceController.getAll);
router.get("/api/services/:id", serviceController.getById);
router.post("/api/services", expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation ,upload.single("serviceLogo"), serviceController.create);
router.patch("/api/services/:id", expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation ,upload.single("serviceLogo") ,serviceController.update);
router.delete("/api/services/:id", expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), tokenValidation ,serviceController.destroy);

export default router;