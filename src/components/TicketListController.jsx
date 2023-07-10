import { useEffect, useRef } from 'react'
import Unauthorize from './Unauthorize';
import { useLogged } from '../hooks/useLogged';
import useUser from '../hooks/useUser';
import { useShift } from '../hooks/useShift';
import LogOut from "../subcomponents/LogOut"
import { useShiftByArea } from '../hooks/useShiftByArea';

const TicketListController = ({ socket }) => {
  
  const dispatchRef = useRef();
  const callRef = useRef();

  const userLogged = useLogged();
  const { auth } = useUser();
  const { shift, getMessage, getShifts } = useShift();
  const [filteredShifts, getShiftByArea] = useShiftByArea();

  const handleDelete = (shift) => {
    socket.emit('delete', shift);
  }

  const handleCall = (data) => {
    socket.emit('call', data);
  }

  const handleReset = () => {
    socket.emit('delete-all-shifts'); //delete all turns and turns in process
  }

  useEffect(() => {
    userLogged();
    getShifts(100);
  }, [])

  useEffect(() => {
    socket.on('message', message => {
        getMessage(message);
    });
    
    
    return () => {
      socket.off('message');
    }
  }, []);
  
  useEffect(() => {
    getShiftByArea(shift);
  }, [shift])

  useEffect(() => {
    if(dispatchRef.current !== undefined){
        if(!filteredShifts?.length) {
              dispatchRef.current.disabled = true;
          callRef.current.disabled = true;
      } else {
        dispatchRef.current.disabled = false;
        callRef.current.disabled = false;
      }
    }
  }, [filteredShifts]);


  return (
    <section className='ticket-controller'>
      {
        window.localStorage.getItem('user') != null ? (
          <>
          <div className='head'>
            <div></div>
            <h1>{auth.areaName}</h1>
            <LogOut />
          </div>
            <div className='controls-container'>
              <div className='table-container' >
                <table>
                  <thead>
                    <tr>
                      <th>Turnos</th>
                    </tr>
                  </thead>
                    <tbody>
                      { filteredShifts?.length ? 
                        filteredShifts.map(sf => <tr key={sf._id}><td>{sf.shift}</td></tr>) : null}
                    </tbody>
                </table>
              </div>
              <div className='button-container'>
                <button ref={dispatchRef} className='btn-menu btn-controller btn-disabled' onClick={(e) => {
                    e.preventDefault();
                    handleDelete(filteredShifts[0]);
                  }}>
                  Despachar
                </button>
                <button ref={callRef} className='btn-menu btn-controller btn-disabled' onClick={(e) => {
                    e.preventDefault();
                    handleCall(filteredShifts[0]);
                  }}>
                  Llamar
                </button>
                <button className='btn-menu btn-controller' onClick={(e) => {
                    e.preventDefault();
                    handleReset();
                  }}>
                  Reiniciar
                </button>
              </div>
            </div>
          </>
        ) : (<Unauthorize />)
      }
    </section>
  )
}

export default TicketListController
