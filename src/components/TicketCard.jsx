import React from 'react'
import "./styles/ticket.css"
import SideBar from './SideBar'
import { useNavigate } from 'react-router-dom';
const TicketCard = ({ ticket, view, handleCancel, onClick ,isCancellable}) => {

  const navigate = useNavigate();




  if (view) {
    return (
      <>
        <SideBar />
        <div className='ticket'>
          <p>Booking ID: {ticket.bookingId}</p>
          <p>Train ID: {ticket.trainId}</p>
          <p>From : {ticket.sourceName} - To: {ticket.destinationName}</p>
          <p>Date : {new Date(ticket.bookingDate).toDateString()}</p>
          <p>Seat count : {ticket.seatCount}</p>
          <p>Total Amount : $ {ticket.totalAmount}</p>
          <p>Waiting Count : {ticket.waitingCount}</p>
          <p>Status: {ticket.status}</p>

          <button
            disabled={!isCancellable}
            onClick={handleCancel}
            className={!isCancellable ? "cancel-btn disabled" : "cancel-btn"}
          >
            Cancel
          </button>
          <button style={{ backgroundColor: 'green', border: 'none', marginLeft: '10px' }} onClick={() => { navigate(-1) }}>Back</button>
        </div>

      </>

    )
  } else {
    return (

      <div key={ticket.booking_id} data-id={ticket.booking_id} className="ticket" onClick={onClick}>
        <p>Booking ID: {ticket.bookingId}</p>
        <p>Train ID: {ticket.trainId}</p>
        <p>From : {ticket.sourceName} - To: {ticket.destinationName}</p>
        <p>Date : {new Date(ticket.bookingDate).toDateString()}</p>
        <p>Status: {ticket.status}</p>
        <hr />
      </div>
    )
  }

}

export default TicketCard