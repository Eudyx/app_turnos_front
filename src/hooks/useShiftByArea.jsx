import { useState } from "react";

export const useShiftByArea = () => {

    const [filteredShifts, setFilteredShits] = useState();

      // filter
  const getShiftByArea = (shift) => {
    let userArea = window.localStorage.getItem('user');
    userArea !== null ?
      userArea = JSON.parse(window.localStorage.getItem('user')).areaName
        : userArea = '';

    setFilteredShits(shift.filter(res =>  res.area.toLowerCase().includes(userArea.toLowerCase())));
}

    return [ filteredShifts, getShiftByArea ];
}