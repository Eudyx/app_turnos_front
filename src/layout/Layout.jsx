import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import LinkToMenu from "../subcomponents/LinkToMenu";

const LayOut = () => {

    const location = useLocation();

  return (
    <>
        { location.pathname === '/login' || location.pathname === '/ticket-list-controller' ? <LinkToMenu /> : null }
      <Outlet />
    </>
  )
}

export default LayOut
