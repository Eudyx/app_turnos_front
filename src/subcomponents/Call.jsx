import React, { useEffect, useState } from 'react'

const Call = ({ socket }) => {
    
    const [call, setCall] = useState({});
    const [showCall, setShowCall] = useState(false);

    const styles = {
        display: showCall ? 'flex' : 'none'
    }

    useEffect(() => {
        socket.on('call', data => {
            setCall(data);
            setShowCall(true)

            setTimeout(() => {
                setShowCall(false);
            }, 3000)
        });


        return () => {
            socket.off('call');
        }
    }, [])

  return (
    <div className='call slide-top' style={styles}>
      <h1>{call.shift}</h1>
    </div>
  )
}

export default Call
