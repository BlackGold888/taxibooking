import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [pickupLat, setPickupLat] = useState("56.9469");
    const [pickupLng, setPickupLng] = useState("24.1059");
    const [dropoffLat, setDropoffLat] = useState("");
    const [dropoffLng, setDropoffLng] = useState("");
    const [ride, setRide] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [error, setError] = useState(null);

    const requestRide = async () => {
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/ride/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pickup: { lat: parseFloat(pickupLat), lng: parseFloat(pickupLng) },
                    dropoff: { lat: parseFloat(dropoffLat), lng: parseFloat(dropoffLng) }
                })
            });
            if (!response.ok) throw new Error("Invalid coordinates");
            const data = await response.json();
            setRide(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const findDrivers = async () => {
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/ride/drivers/nearby?lat=${pickupLat}&lng=${pickupLng}`);
            if (!response.ok) throw new Error("No available drivers within 5 miles");
            const data = await response.json();
            setDrivers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const matchDriver = async () => {
        setError(null);
        if (!ride) {
            setError("No ride requested yet");
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/ride/match", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rideId: ride.id })
            });
            if (!response.ok) throw new Error("No available drivers or invalid ride ID");
            const data = await response.json();
            setRide(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">🚖 Taxi Booking</h1>
            <input
                className="border p-2 w-full mb-2"
                placeholder="Pickup Latitude"
                value={pickupLat}
                onChange={e => setPickupLat(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-2"
                placeholder="Pickup Longitude"
                value={pickupLng}
                onChange={e => setPickupLng(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-2"
                placeholder="Dropoff Latitude"
                value={dropoffLat}
                onChange={e => setDropoffLat(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-2"
                placeholder="Dropoff Longitude"
                value={dropoffLng}
                onChange={e => setDropoffLng(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 w-full mb-2" onClick={requestRide}>Request Ride</button>
            <button className="bg-green-500 text-white p-2 w-full mb-2" onClick={findDrivers}>Find Nearby Drivers</button>
            <button className="bg-orange-500 text-white p-2 w-full" onClick={matchDriver}>Match Driver</button>
            {error && <p className="text-red-500 mt-2">⚠️ {error}</p>}
            {ride && <p className="mt-4">🚕 Ride Status: {ride.status}</p>}
            <ul className="mt-4">
                {drivers.map(driver => (
                    <li key={driver.driverId}>🚗 Driver {driver.driverId} - {driver.distance.toFixed(2)} miles away</li>
                ))}
            </ul>
        </div>
    );
}

export default App
