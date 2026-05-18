import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TrainCreator = () => {
  const baseUrl = "https://trainticketbookingsystem-1.onrender.com/api/";
  const [routes, setRoutes] = useState([]);

  const [trainName, setTrainName] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [routeId, setRouteId] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [tatkalTotalSeats, setTatkalTotalSeats] = useState("");
  const [normalFare, setNormalFare] = useState("");
  const [tatkalFare, setTatkalFare] = useState("");
  const [acFare, setAcFare] = useState("");
  const [nonAcFare, setNonAcFare] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await fetch(baseUrl + "route/");
      const data = await response.json();
      setRoutes(data.data);
    };

    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainBody = {
      trainNumber: Number(trainNumber),
      trainName: trainName,
      routeId: Number(routeId),
      totalSeats: Number(totalSeats),
      tatkalTotalSeats: Number(tatkalTotalSeats),
      normalFare: Number(normalFare),
      tatkalFare: Number(tatkalFare),
      acFare: Number(acFare),
      nonAcFare: Number(nonAcFare),
    };

    try {
      const response = await fetch(baseUrl + "trains/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainBody),
      });

      const data = await response.json();
      // alert(data.message);
      window.location.reload()
      toast.success(data.message);
    } catch (err) {
      console.error("Failed to create train:", err);
      toast.error("Train creation failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Train Creator</h2>

      <form onSubmit={handleSubmit}>
        <label>Train Name:</label>
        <input     required
          type="text"
          value={trainName}
          onChange={(e) => setTrainName(e.target.value)}
        />
        <br /><br />

        <label>Train Number:</label>
        <input     required
          type="number"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
        />
        <br /><br />

        <label>Route:</label>
        <select    required
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
        >
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={route.routeId} value={route.routeId}>
              Route {route.routeId} - {route.distance} km
            </option>
          ))}
        </select>
        <br /><br />

        <label>Total Seats:</label>
        <input     required
          type="number"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
        />
        <br /><br />

        <label>Tatkal Seats:</label>
        <input     required
          type="number"
          value={tatkalTotalSeats}
          onChange={(e) => setTatkalTotalSeats(e.target.value)}
        />
        <br /><br />

        <label>Normal Fare:</label>
        <input     required
          type="number"
          value={normalFare}
          onChange={(e) => setNormalFare(e.target.value)}
        />
        <br /><br />

        <label>Tatkal Fare:</label>
        <input     required
          type="number"
          value={tatkalFare}
          onChange={(e) => setTatkalFare(e.target.value)}
        />
        <br /><br />

        <label>AC Fare:</label>
        <input     required
          type="number"
          value={acFare}
          onChange={(e) => setAcFare(e.target.value)}
        />
        <br /><br />

        <label>Non AC Fare:</label>
        <input     required
          type="number"
          value={nonAcFare}
          onChange={(e) => setNonAcFare(e.target.value)}
        />
        <br /><br />

        <button type="submit">Create Train</button>
      </form>
    </div>
  );
};

export default TrainCreator;