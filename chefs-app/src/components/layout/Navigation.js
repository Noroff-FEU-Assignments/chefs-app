import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  return (
    <>
      <h1>Hello</h1>

      <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
      {/* <FontAwesomeIcon icon={brands('twitter')} /> */}
    </>
  )
}

export default Navigation
