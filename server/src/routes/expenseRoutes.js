import express from "express";
import { deleteExpense } from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.delete("/:expenseId", deleteExpense);

export default router;
