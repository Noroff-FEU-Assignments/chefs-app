import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import burger from "../../images/hamburger.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function RecipeLink({id, name}) {
  return (
    <>
      <div className="link-container">
        <Link to={`details/${id}`} className="recipe-list-links">
          <img src={burger} alt="Burger icon" />
          <h4>{name}</h4>
        </Link>    
        <FontAwesomeIcon icon={solid('pen')} className="pen-icon" />
      </div>
    </>
  )
}

RecipeLink.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string
}

export default RecipeLink;