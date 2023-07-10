import { useState } from "react";

export const useLastNumber = () => {
    const [counter, setCounter] = useState(0);

    // gets the number of the last ticket
    const getLastNumber = (shift) => {
        let data = shift.map(res => res.number);
        data?.length && setCounter(data[data.length - 1]);
    }

    const setTheCounter = (num) => {
        setCounter(num);
    }

    return { counter, getLastNumber, setTheCounter };
}