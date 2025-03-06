import { addRide, getAvailableDrivers, getRideById, assignDriver } from "../repositories/rideRepository.js";
import { haversine } from "../utils/haversine.js";

export const createRide = (pickup, dropoff) => {
    if (!pickup || !dropoff) throw new Error("Invalid coordinates");
    return addRide(pickup, dropoff);
};

export const findNearbyDrivers = (lat, lng) => {
    const drivers = getAvailableDrivers();
    const nearbyDrivers = drivers
        .map(driver => ({
            ...driver,
            distance: haversine(lat, lng, driver.lat, driver.lng)
        }))
        .filter(driver => driver.distance <= 5)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

    if (nearbyDrivers.length === 0) throw new Error("No drivers available within 5 miles");

    return nearbyDrivers;
};

export const matchDriver = (rideId) => {
    const ride = getRideById(rideId);
    if (!ride) throw new Error("Ride not found");

    const nearbyDrivers = findNearbyDrivers(ride.pickup.lat, ride.pickup.lng);
    if (nearbyDrivers.length === 0) throw new Error("No drivers available");

    const driver = nearbyDrivers[0];
    assignDriver(ride.id, driver.driverId);

    return getRideById(ride.id);
};
