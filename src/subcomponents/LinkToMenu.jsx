import { useNavigate } from "react-router-dom"

const LinkToMenu = () => {
    const navigate = useNavigate();
  return (
    <button className='btn-to-menu' onClick={(e) => {
        e.preventDefault();
        navigate('/');
    }}>
      Menu
    </button>
  )
}

export default LinkToMenu
