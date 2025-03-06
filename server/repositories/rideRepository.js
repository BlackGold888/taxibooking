let rides = [];
let drivers = [
    { driverId: 1, lat: 56.9496, lng: 24.1052, status: "available" },
    { driverId: 2, lat: 56.9600, lng: 24.1200, status: "busy" },
    { driverId: 3, lat: 56.9300, lng: 24.0900, status: "available" }
];

export const addRide = (pickup, dropoff) => {
    const ride = { id: rides.length + 1, pickup, dropoff, status: "pending", driverId: null };
    rides.push(ride);
    return ride;
};

export const getAvailableDrivers = () => drivers.filter(d => d.status === "available");

export const getRideById = (id) => rides.find(r => r.id === id);

export const assignDriver = (rideId, driverId) => {
    let ride = getRideById(rideId);
    if (!ride) return;
    ride.status = "assigned";
    ride.driverId = driverId;

    let driver = drivers.find(d => d.driverId === driverId);
    if (driver) driver.status = "busy";
};
