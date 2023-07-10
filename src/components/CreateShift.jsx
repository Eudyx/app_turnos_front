import React, { useEffect, useState } from 'react'
import Ticket from '../subcomponents/Ticket';
import { useShift } from '../hooks/useShift';
import BtnAction from '../subcomponents/BtnAction';
import { useLastNumber } from '../hooks/useLastNumber';
import { useSocketsEvents } from '../socketHooks/useSocketsEvents';

const CreateShift = ({ socket }) => {

    const { shift, getShifts } = useShift();
    const { counter, getLastNumber, setTheCounter } = useLastNumber(0);
    const { emitInfo } = useSocketsEvents(socket);
    const [ticketInfo, setTicketInfo] = useState('');
    const [ticketCreate, setTicketCreate] = useState(false);// to know when the ticket was created

    // area codes
    const areaCode = Object.freeze({
        caja: 'CJ',
        seguros: 'S',
        consultas: 'CN',
        info: 'IF',
    });

    // sets the card ticket display
    const displayTicket = () => {
        setTicketCreate(true);
        setTimeout(() => {
            setTicketCreate(false);
        }, 4000)
    }


    const createTicket = (areaCode, area) => {
        setTicketInfo(`${areaCode}-${counter + 1}`); // saving in a state the next ticket number
        emitInfo(area, areaCode, counter);
        setTheCounter(counter + 1);// increments the counter
    }

    // Effects
    useEffect(() => {
        getShifts(100);

        socket.on('delete-all-shifts', () => {
            setTheCounter(0);
        })

        return () => {
            socket.off('delete-all-shifts');
        } 
    }, []);

    useEffect(() => {
        getLastNumber(shift);
    }, [shift]);

  return (
    <section>
            <BtnAction areaCode={areaCode.caja} area='Caja' createTicket={createTicket} displayTicket={displayTicket}>
                Caja
            </BtnAction>
            <BtnAction areaCode={areaCode.info} area='Información' createTicket={createTicket} displayTicket={displayTicket} >
                Información
            </BtnAction>
            <BtnAction areaCode={areaCode.consultas} area='Consultas' createTicket={createTicket} displayTicket={displayTicket} >
                Consultas
            </BtnAction>
            <BtnAction areaCode={areaCode.seguros} area='Seguros' createTicket={createTicket} displayTicket={displayTicket} >
                Seguros
            </BtnAction>
            <Ticket ticketInfo={ticketInfo} ticketCreate={ticketCreate} displayTicket={displayTicket} />
    </section>
  )
}

export default CreateShift
