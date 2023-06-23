import React from 'react'

const BtnAction= ({ children, createTicket, cls, areaCode, displayTicket, area }) => {

  return (
    <div className='btn-container' >
        <button className={`btn-menu ${cls}`} onClick={(e) => {
            e.preventDefault();
            createTicket(areaCode, area); //creating ticket
            displayTicket(); //setting the ticket display
        }
        }>
            {children}
        </button>
    </div>
  )
}

export default BtnAction
