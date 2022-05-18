import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


  function MessageAccordion(props) {
    const {name, title, message, subject} = props

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
            <button type="button" id="deleteMessageBtn">Delete</button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


      {/* <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{title}</h4>
          <p>
            {message}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal> */}
      </>
    );
  }


MessageAccordion.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string
}

export default MessageAccordion;