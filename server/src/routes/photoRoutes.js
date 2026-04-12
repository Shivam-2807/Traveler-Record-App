import express from "express";
import { addTripPhoto, getTripPhotos } from "../controllers/photoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addTripPhoto);
router.get("/trip/:tripId", getTripPhotos);

export default router;
