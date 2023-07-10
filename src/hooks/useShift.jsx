import { useState } from "react";
import axios from "../api/axios";

export const useShift = () => {
    const [shift, setShift] = useState([]);

    const getShifts = async (limit) => {
      const result = await axios.get(`/shifts/?limit=${limit}`);
      setShift(result.data);
    }

    const getMessage = (data) => {
      setShift(data);
    }

    return { shift, getMessage, getShifts };
}