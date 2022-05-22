import PropTypes from "prop-types";
import Banner from "../../images/recipe-banner.svg"

function HeadingRecipePage(props) {
  return (
    <>
      <div className="recipe-title-container">
        <img src={Banner} alt="recipe-banner" className="recipe-title-banner"/>
        <h2 className="recipe-title-text">{props.children}</h2>
      </div>
    </>

  )
}

HeadingRecipePage.propTypes = {
  children: PropTypes.string.isRequired
}

export default HeadingRecipePage;