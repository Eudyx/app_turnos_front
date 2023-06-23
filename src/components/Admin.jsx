import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BtnMenu from "../subcomponents/BtnMenu";

const Admin = ({ navigate }) => {
  return (
    <section className="menu-container">
      <BtnMenu cls='btn-menu-icon' link='/register' navigate={navigate} >
        <FontAwesomeIcon className="btn-icon" icon={faUserPlus} />
        <p>Nuevo<br />Admin</p>
      </BtnMenu>
      <BtnMenu cls='btn-menu-icon' link='/login' navigate={navigate} >
        <p>Log in</p>
      </BtnMenu>
    </section>
  )
}

export default Admin
