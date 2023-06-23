import React from 'react'
import { useNavigate } from 'react-router-dom';

const BtnMenu = ({ children, link, cls }) => {

  const navigate = useNavigate();

  return (
    <div className='btn-container' >
        <button className={`btn-menu ${cls}`} onClick={(e) => {
            e.preventDefault();
            navigate(link);
          }
        }>
            {children}
        </button>
    </div>
  )
}

export default BtnMenu
