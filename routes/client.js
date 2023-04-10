import express from "express";
import {
  getTours,
  getCustomers,
  getTransactions,
} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/tours", getTours);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
export default router;
