import express from "express";
import multer from "multer";
import {
  createTour,
  getTours,
  getCustomers,
  getTransactions,
  deleteTour,
  updateTour,
  findTour,
  createTransaction,
  findTransaction,
  updateCustomer,
  findCustomer,
  getProvince,
  getOrder,
  deleteOrder,
  createOrder,
  findOrder
} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
const upload = multer();

//PROVINCE
router.get("/provinces",getProvince)

// TOUR
router.get("/tours", verifyToken, getTours);
router.delete("/tours/:id", verifyToken, deleteTour);
router.post("/tours/:id", verifyToken, updateTour);
router.get("/tours/:id", verifyToken, findTour);

// TOUR ORDER 
router.get("/orders", verifyToken, getOrder);
router.delete("/orders/:id", verifyToken, deleteOrder);
router.post("/orders/:id", verifyToken, createOrder);
router.get("/orders/:id", verifyToken, findOrder);
// CUSTOMER
router.get("/customers", verifyToken, getCustomers);
router.post("/customers", verifyToken, updateCustomer);
router.get("/customers/:id", verifyToken, findCustomer);
// TRANSACTION
router.get("/transactions", verifyToken, getTransactions);
router.post("/transactions", verifyToken, createTransaction);
router.get("/transactions/:id", verifyToken, findTransaction);

export default router;
