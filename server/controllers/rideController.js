import { createRide, findNearbyDrivers, matchDriver as matchRide } from "../services/rideService.js";

export const requestRide = (req, res) => {
    const { pickup, dropoff } = req.body;
    try {
        const ride = createRide(pickup, dropoff);
        res.status(201).json(ride);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getNearbyDrivers = (req, res) => {
    const { lat, lng } = req.query;
    try {
        const drivers = findNearbyDrivers(parseFloat(lat), parseFloat(lng));
        res.json(drivers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const matchDriver = (req, res) => {
    const { rideId } = req.body;
    try {
        const ride = matchRide(rideId);
        res.json(ride);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
