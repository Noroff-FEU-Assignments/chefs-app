import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Logo from "../../images/logo-chefs.png";
import Esmiley from "../../images/esmiley-logo.svg";
import Planday from "../../images/planday-logo.svg";
import Motimate from "../../images/motimate-logo.svg";
import Hamburger from "../../images/hamburger.svg";
import { FiLogOut } from "react-icons/fi";
import { FaChevronCircleDown, FaCommentAlt, FaUser } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import LoginForm from "../../pages/login/LoginForm";
import AuthContext from "../../utilities/AuthContext.jsx";

function Navigation() {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    let confirmation = window.confirm("Are you sure you want to logout?");

    if (confirmation) {
      navigate("/");
      setAuth(null);
      localStorage.clear();
    }
  }

  let loginLinks = <div>
                      <Button variant="primary" onClick={() => setModalShow(true)}  id="loginBtn">Login</Button>
                      <LoginForm
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                    </div>
  let adminLinks = ""
  let messagesIcon = ""

  if (auth && auth.data.user.email === "admin@admin.com") {
    loginLinks = <Button variant="primary"  id="loggedBtn">Hi, {auth.data.user.username} <FiLogOut id="logoutIcon" onClick={logout}/></Button>

    adminLinks = <>
              <div id="adminLinks">
              <div className="nav-separator"></div>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <NavLink to="#" className="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin Panel<FaChevronCircleDown id="circleArrowDown"/>
                  </NavLink>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ul>
                    <NavLink to="/messages" className="nav-link" onClick={() => setOpen(false)}>
                      Messages
                    </NavLink>
                    <NavLink to="/add-recipe" className="nav-link" onClick={() => setOpen(false)}>
                      Add Recipe
                    </NavLink>
                    <NavLink to="/add-inventory-item" className="nav-link" onClick={() => setOpen(false)}>
                      Add Inventory Item
                    </NavLink>
                    <NavLink to="/write-announcement" className="nav-link" onClick={() => setOpen(false)}>
                      Write Announcement
                    </NavLink>
                    <Button className="nav-link" id="logoutBtn" onClick={logout}>
                      Logout
                    </Button>
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </div>
                  </>

    messagesIcon = <NavLink to="/messages"><FaCommentAlt id="messageIcon" /></NavLink>
  } else if (auth) {
    loginLinks = <Button variant="primary"  id="loggedBtn">Hello, {auth.data.user.username} <FiLogOut id="logoutIcon" onClick={logout}/></Button>
  }

  function fadeInMenu() {
    setOpen(!open);
  }
  
  return (
    <>
      <header>
        <nav >
          <NavLink to="/" id="logo">
            <img src={Logo} alt="Døgnvill logo" />
          </NavLink>
          <div className="user-burger">
            <div id="userIcons">
              <div>
                {/* <FaUser id="userFigure" onClick={() => setModalShow(true)}/> */}
                <SiCodechef id="userFigure" onClick={() => setModalShow(true)}/>
                {messagesIcon}
              </div>
              {loginLinks}
            </div>
            <img src={Hamburger} id="burgerBtn" onClick={fadeInMenu} alt="burger icon for menu"/>
          </div>
          <div className={open ? "nav-visible" : "nav-list"}>
          {/* <div className={open ? "nav-visible" : "nav-list"}> */}
            <ul>
            <NavLink to="/" className="nav-link" onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/recipes" className="nav-link" onClick={() => setOpen(false)}>
              Recipes
            </NavLink>
            <NavLink to="/inventory" className="nav-link" onClick={() => setOpen(false)}>
              Inventory
            </NavLink>
            <NavLink to="/contact" className="nav-link" onClick={() => setOpen(false)}>
              Contact
            </NavLink>
            </ul>
            {adminLinks}
            <div className="nav-separator" id="navSeparatorRemove"></div>
            <h2 className="nav-heading" id="externalLinksHeading">Press to connect:</h2>
            <div className="external-links">
                <a href="https://secure.e-smiley.dk/" className="ext-link-individual" target="_blank" rel="noreferrer noopener">E-smiley <img src={Esmiley} alt="Esmiley logo"/></a>
                <a href="https://id.planday.com/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Db116846e-8ff0-42dc-83b6-5392543ca73c%26redirect_uri%3Dhttps%253A%252F%252Fdbb.planday.com%252Fauth-callback%26response_type%3Dcode%26scope%3Dopenid%2520impersonate%2520plandayid%26state%3D26911e29e99243c189b9fb0bac7360ed%26code_challenge%3DA0yoEKZBDJpSdpLLXgp7kdGcRbivgLDRKZTTihWHIj4%26code_challenge_method%3DS256%26acr_values%3Dtenant%253Adbb.planday.com%26response_mode%3Dquery" className="ext-link-individual" target="_blank" rel="noreferrer noopener">Planday <img src={Planday} alt="Planday logo"/></a>
                <a href="https://motimate.app/dognvill/" target="_blank" rel="noreferrer noopener">Motimate <img src={Motimate} alt="Motimate logo" /></a>
            </div>
          </div>
          <div className="external-links-desktop">
                <a href="https://secure.e-smiley.dk/" className="ext-link-individual" target="_blank" rel="noreferrer noopener">E-smiley <img src={Esmiley} alt="Esmiley logo"/></a>
                <a href="https://id.planday.com/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Db116846e-8ff0-42dc-83b6-5392543ca73c%26redirect_uri%3Dhttps%253A%252F%252Fdbb.planday.com%252Fauth-callback%26response_type%3Dcode%26scope%3Dopenid%2520impersonate%2520plandayid%26state%3D26911e29e99243c189b9fb0bac7360ed%26code_challenge%3DA0yoEKZBDJpSdpLLXgp7kdGcRbivgLDRKZTTihWHIj4%26code_challenge_method%3DS256%26acr_values%3Dtenant%253Adbb.planday.com%26response_mode%3Dquery" className="ext-link-individual" target="_blank" rel="noreferrer noopener">Planday <img src={Planday} alt="Planday logo"/></a>
                <a href="https://motimate.app/dognvill/" target="_blank" rel="noreferrer noopener">Motimate <img src={Motimate} alt="Motimate logo" /></a>
            </div>
        </nav>
      </header>
    </>
  )
}



export default Navigation
