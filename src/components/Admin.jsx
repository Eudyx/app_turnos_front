import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BtnMenu from "../subcomponents/BtnMenu";
import useUser from "../hooks/useUser";
import { useLogged } from "../hooks/useLogged";
import { useEffect } from 'react'

const Admin = ({ navigate }) => {

  const userLogged = useLogged();
  const { auth } = useUser();

  useEffect(() => {
    userLogged();
  }, [])
  

  return (
    <section className="menu-container">
      <BtnMenu cls='btn-menu-icon' link='/register' navigate={navigate} >
        <FontAwesomeIcon className="btn-icon" icon={faUserPlus} />
        <p>Nuevo<br />Admin</p>
      </BtnMenu>
    {
      auth?.user ?
        <BtnMenu cls='btn-menu-icon' link='/ticket-list-controller' navigate={navigate} >
          <p>Ticket List</p>
        </BtnMenu>
        :
        <BtnMenu cls='btn-menu-icon' link='/login' navigate={navigate} >
          <p>Log in</p>
        </BtnMenu>
    }
    </section>
  )
}

export default Admin
