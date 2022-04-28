import HeadingPage from "../../components/layout/HeadingPage.jsx";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { React, useState, useEffect } from "react";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import Spinner from "../../utilities/Spinner.jsx";
import Button from "react-bootstrap/Button";
import MessageModal from "./MessageModal.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';



function Messages() {
  const messages_URL = api + "/messages";

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [modalShow, setModalShow] = useState(false);


  useEffect( () => {
    async function getMessages() {
      try {
        const response = await fetch(messages_URL);

        if (response.ok) {
          const results = await response.json();
          setMessages(results.data)
          
          console.log(results.data)
        }


      } catch(error) {
        console.log(error);
        <SystemMessage type={"message error"} content={"Something went wrong"} />

      } finally {
        setLoading(false);
      }
    }
    getMessages()
  }, [messages_URL])

  if (loading) {
    <Spinner />
  }

  const searchItems = (searchValue) => {
    setSearch(searchValue)

    if (search !== "") {
      const filteredData = messages.filter( (message) => {      
      return Object.values(message.attributes.title).join("").toLowerCase().includes(search.toLowerCase()) || Object.values(message.attributes.Chefs_name).join("").toLowerCase().includes(search.toLowerCase());
      })
      setFilteredMessages(filteredData);

    } else {
      setFilteredMessages(messages)
    }
  }

  return (
    <>
      <Helmet>
        <title>Messages | Chef's App</title>
      </Helmet>
      <HeadingPage>Messages</HeadingPage>
      <div className="search">
        <input onChange={(e) => searchItems(e.target.value)} type="text" id="searchMessage" className="search-input" placeholder="Search" />
        <FontAwesomeIcon icon={solid('search')} className="search-icon" />
      </div>
      <div id="recipeListContainer">
        {search.length >= 1 ? (
          filteredMessages.map( (message) => {
            const {id, attributes} = message
            return (
              <div key={id}>
              <Button variant="primary" onClick={() => setModalShow(true)} className="modalbtn">
              <div>
                <span className="from">From:</span> <span className="chefs-name">{attributes.chefs_name} | {attributes.title}</span>
              </div> 
              <div className="subject">
                <span >{attributes.subject}</span>
              </div>
              </Button>
                

              <MessageModal 
                title={attributes.title}
                name={attributes.chefs_name}
                subject={attributes.subject}
                message={attributes.message}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          )  
          }) 
          ) : (
              messages.map( (message) => {
                const {id, attributes} = message
                return (
                  <div key={id}>
                <Button variant="primary" onClick={() => setModalShow(true)} className="modalbtn">
                <div>
                  <span className="from">From:</span> <span className="chefs-name">{attributes.chefs_name} | {attributes.title}</span>
                </div> 
                <div className="subject">
                  <span >{attributes.subject}</span>
                </div>
                </Button>
                  

                <MessageModal 
                  title={attributes.title}
                  name={attributes.chefs_name}
                  subject={attributes.subject}
                  message={attributes.message}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
                )
              })
            
            )
      } 
      </div>


      {/* {
        messages.map( (message) => {
          const {id, attributes} = message
          return (
              <div key={id}>
                <Button variant="primary" onClick={() => setModalShow(true)} className="modalbtn">
                <div>
                  <span className="from">From:</span> <span className="chefs-name">{attributes.Chefs_name}</span>
                </div> 
                <div className="subject">
                  <span >{attributes.Subject}</span>
                </div>
                </Button>
                  

                <MessageModal 
                  title={attributes.Title}
                  name={attributes.Chefs_name}
                  subject={attributes.Subject}
                  message={attributes.Message}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
        )  
        }) 
      } */}
    </>
  )
}

export default Messages
