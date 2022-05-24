import PropTypes from "prop-types";

function HeadingPage(props) {
  return <h1 className="page-title">{props.children}</h1>
}

HeadingPage.propTypes = {
  children: PropTypes.string.isRequired
}

export default HeadingPage;