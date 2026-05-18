import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const StationCreator = () => {

    const handleStationSubmit = async (ev)=>{
     ev.preventDefault();
        const formData = new FormData(ev.target);
        const jsonData = Object.fromEntries(formData.entries());
        const response = await fetch("https://trainticketbookingsystem-1.onrender.com/api/station/",{
            method: "post",
            body:JSON.stringify(jsonData)
        })

        const data = await response.json();
        console.log(data);
        toast.info(data.message);
        document.querySelectorAll("#stationForm input").value="";
        window.location.reload();
    }

    const [stations, setStations] = useState([]);

useEffect(() => {
    const fetchStations = async () => {
        const response = await fetch("https://trainticketbookingsystem-1.onrender.com/api/station/",{
            method:"GET"
        });
        const data = await response.json();
        setStations(data.data);
    };

    fetchStations();
}, []);
  return (
    <div>
        <h2>Station Creator</h2>
        <form id='stationForm' onSubmit={handleStationSubmit}>
            <input type="text" placeholder='Name' name='name' required />
            <br />
            <input type="text" placeholder='Place' name='place' required/>
            <br />
            <input type="submit" value={"submit"}/>
        </form>


        {
            console.log(stations)
            
        }
    </div>
  )
}

export default StationCreator