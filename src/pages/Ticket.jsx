import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import TicketCard from "../components/TicketCard";

const Ticket = () => {

    const params = useParams();
    const ticketId = params.id;
    const userId=localStorage.getItem("userId");
    const baseUrl = `https://trainticketbookingsystem-rbih.onrender.com/api/booking/${ticketId}?userId=${userId}`;

    const [ticket, setTicket] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTicket = async () => {
            const response = await fetch(baseUrl);
            const data = await response.json();
            console.log(data.data);
            setTicket(data.data)
            // setTicket(JSON.parse(data.data));
        };

        fetchTicket();
    }, [ticketId]);

    const handleCancel =async () => {
          const response = await fetch(baseUrl,{method:"DELETE"});
            const data = await response.json();
            console.log(data)
            navigate("/history")
        
    };

    return (
        <div>
            
            <TicketCard ticket={ticket} view={true} handleCancel={handleCancel} />
        </div>
    );
};

export default Ticket;