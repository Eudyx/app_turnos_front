import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const ShiftForm = ({ socket }) => {
  
    const [message, setMessage] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', message);
    }

return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' onChange={(e) => setMessage(e.target.value)} value={message} />
            <button>
            Send
            </button>
        </form>
        <div>
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
        </div>
        <button>
            
        </button>
    </div>
  )
}

export default ShiftForm
