
export const useSocketsEvents = (socket) => {

    const emitInfo = (area, areaCode, counter) => {
        socket.emit('message', JSON.stringify({ 
            shift: `${areaCode}-${counter + 1}`,
            area: area
        })); // sending the info to the socket
    }

    return { emitInfo };
}