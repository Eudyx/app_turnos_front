import { useEffect, useState } from "react"
import axios from '../api/axios';

const ShiftTable = ({ socket }) => {

    const [shift, setShift] = useState([]);

    const getShifts = async () => {
      const result = await axios.get('/shifts');
      setShift(result.data);
    }
    
    useEffect(() => {
      getShifts();
    }, []);
    
    useEffect(() => {
        socket.on('message', message => {
          reciveMessage(message)
        });
        return () => {
            socket.off('message');
        }
      }, [shift]);

      const reciveMessage = (message) => setShift(state => [...state, {shift: message}]);

  return (
    <section>
      <table>
        <thead>
            <tr>
                <th>
                    Message
                </th>
            </tr>
        </thead>
        <tbody>
            { shift.map((msg, i) => <tr key={i} ><td>{msg.shift}</td></tr>) }
        </tbody>
      </table>
    </section>
  )
}

export default ShiftTable
