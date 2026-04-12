import express from "express";
import {
  createTrip,
  createTripExpense,
  getTripById,
  getTripExpenses,
  getTrips,
  markTripDone,
  resumeTrip
} from "../controllers/tripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getTrips).post(createTrip);
router.route("/:tripId").get(getTripById);
router.patch("/:tripId/done", markTripDone);
router.patch("/:tripId/resume", resumeTrip);
router.route("/:tripId/expenses").get(getTripExpenses).post(createTripExpense);

export default router;
