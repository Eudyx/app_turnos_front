import React from 'react'

const Ticket = ({ ticketInfo, ticketCreate }) => {
    
    const styles = {
        display: ticketCreate ? 'grid' : 'none' //hiide and show the ticket
    }

  return (
    <div className='ticket-container' style={styles}>
        <div className='ticket' >
            <h2>Su turno es:</h2>
            <h1>{ticketInfo}</h1>
        </div>
    </div>
  )
}

export default Ticket
