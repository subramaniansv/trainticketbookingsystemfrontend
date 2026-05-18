import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatTime,arrayToDate } from "../Util.js";
import SideBar from "../components/SideBar";
const Train = () => {
  const baseURL = "https://trainticketbookingsystem-1.onrender.com/api/";
  const { id, km } = useParams();
  const navigate = useNavigate();

  const [train, setTrain] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [seatCount, setSeatCount] = useState(1);
  const [isAc, setIsAc] = useState(false);

  const fetchTrain = async () => {
    const response = await fetch(`${baseURL}trains/${id}`);
    const data = await response.json();
    setTrain(data.data);
  };

const fetchSchedules = async () => {
  const response = await fetch(`${baseURL}time/?trainId=${id}`);
  const data = await response.json();
  setSchedules(data.data ?? []);  
};

  useEffect(() => {
    fetchTrain();
  }, [id]);

  useEffect(() => {
    fetchSchedules();
  }, [id, isAc]);

  const isTomorrow = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const scheduleDate = Array.isArray(date)
      ? new Date(date[0], date[1] - 1, date[2])
      : new Date(date);
    return (
      scheduleDate.getFullYear() === tomorrow.getFullYear() &&
      scheduleDate.getMonth() === tomorrow.getMonth() &&
      scheduleDate.getDate() === tomorrow.getDate()
    );
  };

  const calculatePrice = () => {
    if (!train) return 0;
    let acFare = isAc ? train.acFare : 0;
    let nonAcFare = isAc ? 0 : train.nonAcFare;
    return (km * train.normalFare + acFare + nonAcFare) *seatCount ;
  };

  const calculateTatkalPrice = () => {
    if (!train) return 0;
    let acFare = isAc ? train.acFare : 0;
    let nonAcFare = isAc ? 0 : train.nonAcFare;
    return( km * train.tatkalFare + acFare + nonAcFare) * seatCount;
  };

  const formatDate = (date) => {
    if (Array.isArray(date)) {
      return `${date[0]}-${String(date[1]).padStart(2, "0")}-${String(date[2]).padStart(2, "0")}`;
    }
    return date;
  };

  const buildBookingBody = (schedule, tatkal) => ({
    totalAmount: tatkal ? calculateTatkalPrice() : calculatePrice(),
    userId: localStorage.getItem("userId") || 0,
    trainId: train.id,
    routeId: train.routeId,
    scheduleId: schedule.scheduleId,
    bookingDate: formatDate(schedule.date),
    seatCount: seatCount,
    ac: isAc,
  });

  const handleBooking = async (schedule, tatkal = false) => {
    const bookingBody = buildBookingBody(schedule, tatkal);
    const url = tatkal ? `${baseURL}tatkal/` : `${baseURL}general/`;
    try {
      console.log("Booking body:", bookingBody);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingBody),
      });
      const data = await response.json();
      console.log(data);
      navigate("/ticket/"+data.data.bookingId);
      toast.success("Booking successful");
    } catch (err) {
      console.error("Booking failed:", err);
      toast.error("Booking failed. Please try again.");
    }

  };

  const [filteredSchedules, setFilteredSchedules] = useState([]);
  useEffect(() => {
    setFilteredSchedules(schedules);
  }, [schedules]);

const handleScheduleFilter = (value) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (value === "all") {
    setFilteredSchedules(schedules);
  }

  else if (value === "today") {
    const filtered = schedules.filter((schedule) => {
      const date = arrayToDate(schedule.date);
      return date.getTime() === today.getTime();
    });

    setFilteredSchedules(filtered);
  }
  else if (value === "tomorrow") {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const filtered = schedules.filter((schedule) => {
      const date = arrayToDate(schedule.date);
      return date.getTime() === tomorrow.getTime();
    });

    setFilteredSchedules(filtered);
  }

 else if (value === "future") {
    const filtered = schedules.filter((schedule) => {
      const date = arrayToDate(schedule.date);
      return date > today;
    });

    setFilteredSchedules(filtered);
  }
};



return (
  <>

    <style>{`
      .train-container {  margin:auto; margin-left: 100px; font-family:Arial, Helvetica, sans-serif; }
      .train-card { background:#f4f6f8; padding:20px; border-radius:10px; margin-bottom:20px; max-width: 800px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
      .schedule-list { list-style:none; padding:0; display:flex; flex-wrap:wrap; min-width: 100%; gap:10px; }
      .schedule-item { background:#ffffff; padding:15px; margin-bottom:10px; border-radius:8px; min-width: 30%; max-width: 40%; border:1px solid #ddd; display:flex; flex-direction:column; gap:5px; }
      .controls { margin-top:15px; display:flex; gap:15px; align-items:center; }
      .btn-group { display:flex; gap:10px; margin-top:8px; }
      button { background:#1976d2; color:white; border:none; padding:8px 14px; border-radius:5px; cursor:pointer; }
      button:hover { background:#125ea6; }
      .tatkal-btn { background:#e65100; }
      .tatkal-btn:hover { background:#bf360c; }
      input[type="number"] { width:60px; padding:4px; }
    `}</style>

    <div className="train-container">
      <SideBar />
      <h2>Train</h2>

      {!train ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="train-card">
            <p><b>Name:</b> {train.trainName}</p>
            <p><b>Number:</b> {train.trainNumber}</p>
            <p><b>Distance:</b> {km} km</p>
            <p><b>Base Fare:</b> $ {train.normalFare * km}</p>
            <p><b>Tatkal Fare:</b> $ {train.tatkalFare * km}</p>
            <p><b>AC Fare:</b> $ {train.acFare}</p>
            <p><b>Non AC Fare:</b> $ {train.nonAcFare}</p>

            <div className="controls">
              <label>Seats:</label>
              <input
                type="number"
                min="1" max="7"
                value={seatCount}
                onChange={(e) => setSeatCount(Number(e.target.value))}
              />

              <label>
                <input
                  type="checkbox"
                  checked={isAc}
                  onChange={(e) => setIsAc(e.target.checked)}
                />
                AC
              </label>

              <p><b>Total Price:</b> $ {calculatePrice()}</p>
            </div>
          </div>

          <h3>Schedules</h3>
            <select onChange={(e) => handleScheduleFilter(e.target.value)}>
              <option value="all">All Dates</option>
              <option value="tomorrow">Tomorrow Only</option>
            <option value ="future">Future Dates</option>
            </select>


          <ul className="schedule-list">
            {filteredSchedules.length === 0 ? (
              <p>No schedules available for this train.</p>
            ) : (
              filteredSchedules
              .filter((schedule) => new Date(schedule.date) >= new Date())
              .map((schedule) => (
                <li className="schedule-item" key={schedule.scheduleId}>
                  <p><b>Start Time:</b> {formatTime(schedule.startTime)}</p>
                  <p><b>End Time:</b> {formatTime(schedule.endTime)}</p>
                  <p><b>Date:</b> {formatDate(schedule.date)}</p>

                  <p>
                    <b>Available Seats:</b>{" "}
                    {train.totalSeats - schedule.bookedSeats}
                  </p>

                  {isTomorrow(schedule.date) && (
                    <p>
                      <b>Tatkal Available:</b>{" "}
                      {train.tatkalTotalSeats - schedule.tatkalBookedSeats}
                    </p>
                  )}

                  <div className="btn-group">
                    <button onClick={() => handleBooking(schedule, false)}>
                      Book Now = $ {calculatePrice()}
                    </button>

                    {isTomorrow(schedule.date) && (
                      <button
                        className="tatkal-btn"
                        onClick={() => handleBooking(schedule, true)}
                      >
                        Tatkal Book = $ {calculateTatkalPrice()}
                      </button>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  </>
);
};

export default Train;