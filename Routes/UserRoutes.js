import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
} from "../Controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, getUsers);

export default router;
