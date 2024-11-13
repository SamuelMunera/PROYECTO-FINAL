import TypeUser from "../models/TypeUser.js";
import express from "express";
import typeUserController from "../controllers/typeUserController.js";

const router = express.Router();

router.get("/api/typeUser", typeUserController.getAll);
router.get("/api/typeUser/:id", typeUserController.getById);
router.post("/api/typeUser", typeUserController.create);
router.patch("/api/typeUser/:id", typeUserController.update);
router.delete("/api/typeUser/:id", typeUserController.destroy);

export default router;