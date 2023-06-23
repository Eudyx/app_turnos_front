import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser"

const LogOut = () => {

    const { setAuth } = useUser();

    // const navigate = useNavigate()
    const handleLogout = () => {
        window.localStorage.removeItem('user');
        setAuth({});
    }

  return (
    <div className="log-out-container" >
        <p>Salir</p>
      <FontAwesomeIcon onClick={(e) => {
        e.preventDefault();
        handleLogout();
      }
        } id="log-out-icon" icon={faArrowRightFromBracket} />
    </div>
  )
}

export default LogOut
