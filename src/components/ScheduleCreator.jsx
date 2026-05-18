import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ScheduleCreator = () => {
  const baseURL = "https://trainticketbookingsystem-1.onrender.com/api/";

  const [trains, setTrains] = useState([]);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [trainId, setTrainId] = useState("");

  useEffect(() => {
    const loadTrains = async () => {
      const response = await fetch(baseURL + "trains/");
      const data = await response.json();
      setTrains(data.data);
    };

    loadTrains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      trainId: Number(trainId)
    };

    try {
      const response = await fetch(baseURL + "time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      // alert(data.message);
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Schedule creation failed. Please try again.");
    }
        window.location.reload();

  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Create Schedule</h2>

      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br /><br />

        <label>Start Time</label>
        <br />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <br /><br />

        <label>End Time</label>
        <br />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <br /><br />

        <label>Train</label>
        <br />
        <select value={trainId} onChange={(e) => setTrainId(e.target.value)}>
          <option value="">Select Train</option>

          {trains.map((train) => (
            <option key={train.id} value={train.id}>
              {train.trainName} ({train.trainNumber})
            </option>
          ))}
        </select>

        <br /><br />

        <button type="submit">Create Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleCreator;