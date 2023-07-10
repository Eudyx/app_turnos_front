import { useEffect, useState } from "react"
import axios from '../api/axios';
import { useShift } from "../hooks/useShift";
import Call from "../subcomponents/Call";

const ShiftTable = ({ socket }) => {

    const { shift, getMessage, getShifts } = useShift();
    const [shiftMod, setShiftMod] = useState([]);
    const [process, setProcess] = useState();
    
    const getInProcess = async () => {
      const result = await axios.get('/process');
      setProcess(result.data);
    }

    useEffect(() => {
      getShifts(7);
      getInProcess();
    }, []);

    useEffect(() => {
      setShiftMod(shift.slice(0, 6)); //gets only 7 turns 
    }, [shift]);
    
    useEffect(() => {
        socket.on('message', message => { // getting turns
          getMessage(message);
        });

        socket.on('process', pro => { // getting turns in process
            setProcess(pro);
        })

        return () => {
            socket.off('message');
            socket.off('process');
        }
    }, []);

  return (
    <section className="shift-section" >
      <div>
        <h1 className="sub-title">Próximos</h1>
        <div className="shift-container">
          { shiftMod.map((msg) => <div key={msg._id} className="shift" >{msg.shift}</div>) }
        </div>
      </div>
      <div>
        <h1 className="sub-title">En proceso</h1>
        <div className="process-container">
          { process?.length ? process.map((msg) => 
          <div key={msg._id} className="process slide-top" >
            <div className="top">
              <h1>
                {msg.shift}
              </h1>
            </div>
            <div className="bottom">
              <h1>
                {msg.area}
              </h1>
            </div>
          </div>) : null }
        </div>
      </div>
      <Call socket={socket} />
    </section>
  )
}

export default ShiftTable
