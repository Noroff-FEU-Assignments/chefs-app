import PropTypes from "prop-types";

function SubHeadingPage(props) {
  return <h2 className="page-sub-heading">{props.children}</h2>
}

SubHeadingPage.propTypes = {
  children: PropTypes.string.isRequired
}

export default SubHeadingPage;