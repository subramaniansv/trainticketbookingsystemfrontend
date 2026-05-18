import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/booking.css"
import SideBar from "../components/SideBar";
const Booking = () => {

    const baseURL = "https://trainticketbookingsystem-1.onrender.com/api/";

    const [stations, setStations] = useState([]);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [routes, setRoutes] = useState([]);
    const [trains, setTrains] = useState([]);
    useEffect(() => {
        const loadStations = async () => {
            const response = await fetch(baseURL + "station/");
            const data = await response.json();
            setStations(data.data);
        };

        loadStations();
    }, []);
    const fetchRoute = async () => {
        if (!source || !destination) {
            alert("Please select both source and destination");
            return;
        }

        const response = await fetch(
            `${baseURL}route/?sourceId=${source}&destinationId=${destination}`
        );
        console.log(`${baseURL}route/?sourceId=${source}&destinationId=${destination}`);
        const data = await response.json();
        setRoutes(data.data);
    }
    const fetchTrains = async (routeId) => {
        const response = await fetch(
            `${baseURL}trains/?routeId=${routeId}`
        );
        console.log(`${baseURL}trains/?routeId=${routeId}`);
        const data = await response.json();
        console.log(data);
        setTrains(data.data);
        console.log(data.data);
    }
    const [distance, setDistance] = useState(0);
    const navigate = useNavigate();
    return (
        <>

        <SideBar/>
    <div className="booking-container">       
             <h2>Book Ticket</h2>

            <select value={source} onChange={(e) => setSource(e.target.value)}>
                <option value="">Select Source</option>
                {stations.map((s) => (
                    <option key={s.stationId} value={s.stationId}>
                         {s.name}, {s.place}
                    </option>
                ))}
            </select>

            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="">Select Destination</option>
                {stations
                    .filter((s) => s.stationId != source)
                    .map((s) => (
                        <option key={s.stationId} value={s.stationId}>
                          {s.name}, {s.place}
                        </option>
                    ))}
            </select>


            <button onClick={fetchRoute}> Get Routes </button>


            <h2>Available Routes</h2>
            <ul>


                {routes.length === 0 && <p>No routes available for the selected source and destination.</p>}

                {routes.map((route) => (
                    <li key={route.routeId}>
                       Name : {route.name} <br/> distance : {route.distance} km <br/><button onClick={() => {
                            fetchTrains(route.routeId);
                            setDistance(route.distance);
                        }}>View Trains</button>
                    </li>
                ))}
            </ul>

            <h2>Available Trains</h2>
            <ul>
                {trains.length === 0 && <p>No trains available for this route.</p>}
                {
                    trains.map((train) => (
                        <li key={train.id} onClick={() => navigate(`/train/${train.id}/${distance}`)}>
                            {console.log(train)}
                            Name : {train.trainName} <br />
                            Number : {train.trainNumber} <br />
                            Base Fare :$ {train.normalFare} <br />
                        </li>
                    ))}
            </ul>
                
                <button onClick={()=>{localStorage.removeItem("userId")
                    navigate("/login")
                }}>Log out</button>

</div>
        </>
    );
};

export default Booking;