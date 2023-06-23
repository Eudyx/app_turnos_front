import React, { useEffect, useState } from 'react'
import Ticket from '../subcomponents/Ticket';
import { useShift } from '../hooks/useShift';
import BtnAction from '../subcomponents/BtnAction';

const CreateShift = ({ socket }) => {

    const [shift, setShift, getShifts] = useShift();
    const [counter, setCounter] = useState(0);
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

    // gets the number the last ticket
    const getLastNumber = () => {
        let data = shift.map(res => res.number);
        data?.length && setCounter(data[data.length - 1]);
    }

    const createTicket = async (areaCode, area) => {
        setTicketInfo(`${areaCode}-${counter + 1}`); // saving in a state the next ticket number
        socket.emit('message', JSON.stringify({ 
            shift: `${areaCode}-${counter + 1}`,
            area: area
        })); // sending the info to the socket
        setCounter(prev => prev + 1);// increments the counter
    }

    useEffect(() => {
        getShifts(100);

        socket.on('delete-all-shifts', () => {
            setCounter(0);
        })

        return () => {
            socket.off('delete-all-shifts');
        } 
    }, []);

    useEffect(() => {
        getLastNumber();
        console.log(counter)
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
