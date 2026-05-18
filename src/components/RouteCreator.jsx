import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RouteCreator = () => {
  const baseURL = "https://trainticketbookingsystem-1.onrender.com/api/";

  const [stations, setStations] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const loadStations = async () => {
      const response = await fetch(baseURL + "station/");
      const data = await response.json();
      setStations(data.data);
    };

    loadStations();
  }, []);

  const handleCreateRoute = async () => {
    if (!source || !destination || !distance) {
      alert("Please fill all fields");
      return;
    }

    const routeBody = {
      sourceId: Number(source),
      destinationId: Number(destination),
      distance: Number(distance),
      name: name,
    };

    try {
      const response = await fetch(baseURL + "route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeBody),
      });

      const data = await response.json();
      // alert(data.message);
      toast.success(data.message);
      setSource("");
      setDestination("");
      setDistance("");
      setName("");
        window.location.reload();

    } catch (err) {
      console.error("Route creation failed:", err);
      toast.error("Route creation failed. Please try again.");
    }

  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Route Creator</h2>

      <select    required value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">Select Source</option>
        {stations.map((s) => (
          <option key={s.stationId} value={s.stationId}>
            {s.name}
          </option>
        ))}
      </select>

      <br /><br />

      <select    required value={destination} onChange={(e) => setDestination(e.target.value)}>
        <option value="">Select Destination</option>
        {stations
          .filter((s) => s.stationId != source)
          .map((s) => (
            <option key={s.stationId} value={s.stationId}>
              {s.name}
            </option>
          ))}
      </select>

      <br /><br />

      <input required
        type="text"
        placeholder="Route Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input required
        type="number"
        placeholder="Distance in KM"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      {/* <input
        type="number"
        placeholder="Distance in KM"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      /> */}

      <br /><br />

      <button onClick={handleCreateRoute}>Create Route</button>
    </div>
  );
};

export default RouteCreator;