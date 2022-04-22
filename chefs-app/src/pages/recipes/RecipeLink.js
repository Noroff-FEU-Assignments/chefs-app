import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import burger from "../../images/hamburger.svg";

function RecipeLink({id, name}) {
  return (
    <>
      <Link to={`details/${id}`} className="recipe-list-links">
        <img src={burger} alt="Burger icon" />
        <h4>{name}</h4>
      </Link>    
    </>
  )
}



export default RecipeLink;