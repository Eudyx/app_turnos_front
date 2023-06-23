import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BtnMenu from "../subcomponents/BtnMenu";

const SelectSection = ({ navigate }) => {
  return (
    <section className="menu-container">
      <BtnMenu cls='btn-menu-icon' link='/clients' navigate={navigate} >
        <FontAwesomeIcon className="btn-icon" icon={faUsers} />
        <p>Clientes</p>
      </BtnMenu>
      <BtnMenu cls='btn-menu-icon' link='/admin' navigate={navigate} >
        <FontAwesomeIcon className="btn-icon" icon={faUser} />
        <p>Admin</p>
      </BtnMenu>
    </section>
  )
}

export default SelectSection
