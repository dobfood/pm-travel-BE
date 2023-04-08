import express from "express";
import {
  getTours,
  getCustomers,
  getTransactions,
} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/products", verifyToken, getTours);
router.get("/customers", verifyToken, getCustomers);
router.get("/transactions", verifyToken, getTransactions);
export default router;
