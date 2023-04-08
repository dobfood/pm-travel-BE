import express from "express";
import {getAdmins} from "../controllers/managements.js"
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/admins",verifyToken, getAdmins)

export default router;
