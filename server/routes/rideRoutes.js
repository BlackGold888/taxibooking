import express from "express";
import { requestRide, getNearbyDrivers, matchDriver } from "../controllers/rideController.js";

const router = express.Router();

router.post("/request", requestRide);
router.get("/drivers/nearby", getNearbyDrivers);
router.post("/match", matchDriver);

export default router;
