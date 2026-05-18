import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
import SideBar from '../components/SideBar';
const TicketHistory = () => {
    const userID = localStorage.getItem("userId");
    const baseUrl = `https://trainticketbookingsystem-rbih.onrender.com/api/booking/?userId=${userID}`;

    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        const fetchTickets = async () => {
            const response = await fetch(baseUrl, {
                method: "GET"
            });

            const data = await response.json();


            setTickets(data.data);
        };

        fetchTickets();


    }, []);
    const handleClick = (id) => {
        navigate(`/ticket/${id}`);
    };


    const [filterdTickets, setFilterdTickets] = useState(tickets);
    const handleFilterChange = (e) => {
        const value = e.target.value;
        if (value === "all") {
            setFilterdTickets(tickets);
        } else {
            const filtered = tickets.filter(ticket => ticket.status.toLowerCase() === value.toLowerCase()).sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
            setFilterdTickets(filtered);
        }
    };
useEffect(() => {
    setFilterdTickets(tickets);
}, [tickets]);
    return (


        <><SideBar />
            <div>
                <h2 style={{ marginLeft: '100px' }}>   TicketHistory</h2>
                Total Tickets: {tickets.length}<br/>
                Filter by: <select  onChange={handleFilterChange} style={{ marginLeft: '10px' }}>
                    <option value="all">All</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="tatkalConfirmed">Tatkal Confirmed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="refunded">Refunded</option>
                    <option value="completed">Completed</option>
                </select>
                <div className="list">
                    {filterdTickets.length === 0 ? "No tickets found." : ""}
                    {filterdTickets.map((ticket) => (
                        <TicketCard ticket={ticket} key={ticket.bookingId} onClick={() => handleClick(ticket.bookingId)} isCancellable ={ticket.status !== "CANCELLED" && ticket.status !== "REFUNDED" && ticket.status !== "COMPLETED"}/>
                    ))}
                </div>
            </div>

        </>
    )
}

export default TicketHistory