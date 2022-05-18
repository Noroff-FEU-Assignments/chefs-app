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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import LoginForm from "../../pages/login/LoginForm";
import AuthContext from "../../utilities/AuthContext.jsx";

function Navigation() {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(auth.data.user.username)

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
    loginLinks = <Button variant="primary"  id="loggedBtn">Hi, {auth.data.user.username} <FontAwesomeIcon icon={solid('arrow-right-from-bracket')} id="logoutIcon" onClick={logout}/></Button>

    adminLinks = <>
              <div id="adminLinks">
              <div className="nav-separator"></div>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <NavLink to="#" className="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin Panel<FontAwesomeIcon icon={solid('chevron-circle-down')} id="circleArrowDown"/>
                  </NavLink>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ul>
                    <NavLink to="/messages" className="nav-link">
                      Messages
                    </NavLink>
                    <NavLink to="/add-recipe" className="nav-link">
                      Add Recipe
                    </NavLink>
                    <NavLink to="/add-inventory-item" className="nav-link">
                      Add Inventory Item
                    </NavLink>
                    <NavLink to="/write-announcement" className="nav-link">
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

    messagesIcon = <FontAwesomeIcon icon={solid('message')} id="messageIcon" />
  } else if (auth) {
    loginLinks = <Button variant="primary"  id="loggedBtn">Hello, {auth.data.user.username} <FontAwesomeIcon icon={solid('arrow-right-from-bracket')} id="logoutIcon" onClick={logout}/></Button>
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
                <FontAwesomeIcon icon={solid('user')} id="userFigure" onClick={() => setModalShow(true)}/>
                {messagesIcon}
              </div>
              {loginLinks}
            </div>
            <img src={Hamburger} id="burgerBtn" onClick={fadeInMenu} alt="burger icon for menu"/>
          </div>
          <div className={open ? "nav-visible" : "nav-list"}>
          {/* <div className={open ? "nav-visible" : "nav-list"}> */}
            <ul>
            <NavLink to="/" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/recipes" className="nav-link">
              Recipes
            </NavLink>
            <NavLink to="/inventory" className="nav-link">
              Inventory
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
            </ul>
            {adminLinks}
            <div className="nav-separator" id="navSeparatorRemove"></div>
            <h2 className="nav-heading" id="externalLinksHeading">Press to connect:</h2>
            <div className="external-links">
                <a href="https://secure.e-smiley.dk/" className="ext-link-individual">E-smiley <img src={Esmiley} alt="Esmiley logo"/></a>
                <a href="https://id.planday.com/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Db116846e-8ff0-42dc-83b6-5392543ca73c%26redirect_uri%3Dhttps%253A%252F%252Fdbb.planday.com%252Fauth-callback%26response_type%3Dcode%26scope%3Dopenid%2520impersonate%2520plandayid%26state%3D26911e29e99243c189b9fb0bac7360ed%26code_challenge%3DA0yoEKZBDJpSdpLLXgp7kdGcRbivgLDRKZTTihWHIj4%26code_challenge_method%3DS256%26acr_values%3Dtenant%253Adbb.planday.com%26response_mode%3Dquery" className="ext-link-individual">Planday <img src={Planday} alt="Planday logo"/></a>
                <a href="https://motimate.app/dognvill/">Motimate <img src={Motimate} alt="Motimate logo" /></a>
            </div>
          </div>
          <div className="external-links-desktop">
                <a href="https://secure.e-smiley.dk/" className="ext-link-individual">E-smiley <img src={Esmiley} alt="Esmiley logo"/></a>
                <a href="https://id.planday.com/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Db116846e-8ff0-42dc-83b6-5392543ca73c%26redirect_uri%3Dhttps%253A%252F%252Fdbb.planday.com%252Fauth-callback%26response_type%3Dcode%26scope%3Dopenid%2520impersonate%2520plandayid%26state%3D26911e29e99243c189b9fb0bac7360ed%26code_challenge%3DA0yoEKZBDJpSdpLLXgp7kdGcRbivgLDRKZTTihWHIj4%26code_challenge_method%3DS256%26acr_values%3Dtenant%253Adbb.planday.com%26response_mode%3Dquery" className="ext-link-individual">Planday <img src={Planday} alt="Planday logo"/></a>
                <a href="https://motimate.app/dognvill/">Motimate <img src={Motimate} alt="Motimate logo" /></a>
            </div>
        </nav>
      </header>
        
          {/* <Container>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/write-announcement" element={<Announcements />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/add-inventory-item" element={<NewInventoryItem />} />
              <Route path="/add-recipe" element={<NewRecipe />} />
              <Route path="/recipes/details/:id" element={<RecipeDetails />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </Container> */}
      
    </>
  )
}



export default Navigation
