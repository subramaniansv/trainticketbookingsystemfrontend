import React, { useEffect, useState } from "react";
import StationCreator from "../components/StationCreator";
import RouteCreator from "../components/RouteCreator";
import TrainCreator from "../components/TrainCreator";
import ScheduleCreator from "../components/ScheduleCreator";
import { toast } from "react-toastify";
import SideBar from "../components/SideBar";
import { X } from "lucide-react";
import { formatDate, formatTime } from "../Util.js";
import "./styles/admin.css";
const AdminDashboard = () => {
  const baseURL = "https://trainticketbookingsystem-rbih.onrender.com/api/";

  const [stations, setStations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [trains, setTrains] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const loadData = async () => {
    try {
      const [stationRes, routeRes, trainRes, scheduleRes] = await Promise.all([
        fetch(baseURL + "station/"),
        fetch(baseURL + "route/"),
        fetch(baseURL + "trains/"),
        fetch(baseURL + "time/")
      ]);

      const stationsData = await stationRes.json();
      const routesData = await routeRes.json();
      const trainsData = await trainRes.json();
      const schedulesData = await scheduleRes.json();

      setStations(stationsData.data || []);
      setRoutes(routesData.data || []);
      setTrains(trainsData.data || []);
      setSchedules(schedulesData.data || []);
      console.log(schedules);

      toast.success("Admin data loaded successfully");
    } catch (err) {
      console.error("Failed loading admin data", err);
      toast.error("Failed to load admin data. Please try again.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const getStationName = (id) => {
    const station = stations.find((s) => s.stationId === id);
    return station ? station.name : "Unknown";
  };



  const [activeModal, setActiveModal] = useState(null);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setActiveModal(null)
    }
  })
  return (
    <>
      <SideBar />
      <div style={{ padding: "20px", fontFamily: "Arial" }}>

        <h1 style={{ marginLeft: "40px" }}> Admin Dashboard</h1>

        <div>
          <button onClick={() => setActiveModal("station")}>Station</button>
          <button onClick={() => setActiveModal("route")}>Route</button>
          <button onClick={() => setActiveModal("train")}>Train</button>
          <button onClick={() => setActiveModal("schedule")}>Schedule</button>
        </div>

        {activeModal && (
          <div className="modal-overlay">
            <div className="modal">
              <button onClick={() => setActiveModal(null)} style={{ float: "right" }}><X /></button>

              {activeModal === "station" && <StationCreator />}
              {activeModal === "route" && <RouteCreator />}
              {activeModal === "train" && <TrainCreator />}
              {activeModal === "schedule" && <ScheduleCreator />}

            </div>
          </div>
        )}
        {/* Data Section */}


        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "30px" }}>

          {/* Stations */}
          <div className="table-card">
            <h3>Stations</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th> Place</th>
                </tr>
              </thead>
              <tbody>
                {stations.map((s) => (
                  <tr key={s.stationId}>
                    <td>{s.stationId}</td>
                    <td>{s.name}</td>
                    <td>{s.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Routes */}
          <div className="table-card">
            <h3>Routes</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r.routeId}>
                    <td>{r.routeId}</td>
                    <td>{getStationName(r.sourceId)}</td>
                    <td>{getStationName(r.destinationId)}</td>
                    <td>{r.distance} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Trains */}
          <div className="table-card">
            <h3>Trains</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Route</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.trainName}</td>
                    <td>{t.trainNumber}</td>
                    <td>{t.routeId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Schedules */}
          <div className="table-card">
            <h3>Schedules</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Train</th>
                  <th>Date</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => (
                  <tr key={s.scheduleId}>

                    <td>{s.scheduleId}</td>
                    <td>{s.trainId}</td>
                    <td>{formatDate(s.date)}</td>
                    <td>{formatTime(s.startTime)}</td>
                    <td>{formatTime(s.endTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>


            {/* <Trash2/> */}
          </div>

        </div>

        <style>{`
        .card{
          background:white;
          padding:15px;
          border-radius:10px;
          box-shadow:0 2px 6px rgba(0,0,0,0.1);
        }

        .table-card{
          background:white;
          padding:20px;
          border-radius:10px;
          box-shadow:0 2px 6px rgba(0,0,0,0.1);
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:10px;
        }

        th, td{
          border-bottom:1px solid #eee;
          padding:8px;
          text-align:left;
        }

        th{
          background:#f5f5f5;
        }
      `}</style>
      </div>

    </>
  );
};

export default AdminDashboard;