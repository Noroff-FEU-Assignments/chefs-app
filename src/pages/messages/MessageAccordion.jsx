import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import { FaTrash } from "react-icons/fa";

function MessageAccordion(props) {
  const {name, title, message, subject, deleteMessage} = props
  
  return (
    <>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header >
          <div>
            <span className="from">From:</span> {name} <span className="message-title-desktop"> - <span>{title}</span></span>
          </div>
          <div>
            {subject}
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="message-title">
            {title}
          </div>
          <div className="message-content">
            {message}
          </div>
          <button type="button" id="deleteMessageBtn"  onClick={deleteMessage}>Delete <FaTrash/></button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  );
}


MessageAccordion.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  subject: PropTypes.string,
}

export default MessageAccordion;