import React from 'react'
import { faTicket, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BtnMenu from "../subcomponents/BtnMenu";

const Clients = ({ navigate }) => {
  return (
    <section className="menu-container">
      <BtnMenu cls='btn-menu-icon' link='/shiftTable' navigate={navigate} >
        <FontAwesomeIcon className="btn-icon" icon={faTicket} />
        <p>Turnos</p>
      </BtnMenu>
      <BtnMenu cls='btn-menu-icon' link='/create-shift' navigate={navigate} >
        <FontAwesomeIcon className="btn-icon" icon={faPlus} />
        <p>Crear</p>
      </BtnMenu>
    </section>
  )
}

export default Clients
