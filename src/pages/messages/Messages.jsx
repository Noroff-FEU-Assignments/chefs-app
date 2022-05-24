import HeadingPage from "../../components/layout/HeadingPage.jsx";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { React, useState, useEffect, useContext } from "react";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import Spinner from "../../utilities/Spinner.jsx";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import MessageAccordion from "./MessageAccordion.jsx";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from "axios";
import AuthContext from "../../utilities/AuthContext.jsx";



function Messages() {
  const messages_URL = api + "/messages";

  const [auth, setAuth] = useContext(AuthContext);
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  console.log(messages)


  useEffect( () => {
    async function getMessages() {
      try {
        const response = await axios.get(messages_URL,
          { headers: {
            Authorization: `Bearer ${auth.data.jwt}`,
          }});

          if(response.status === 200) {
            setMessages(response.data.data)
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

  if (messages.length === 0) {
    return (
      <>
      <HeadingPage>Messages</HeadingPage>
      <SystemMessage type={"message normal"} content={"There are no messages to show"} />
      </>
    )
  }

  const searchItems = (searchValue) => {
    setSearch(searchValue);
      const filteredData = messages.filter( (message) => {
      if (message.attributes.title.toLowerCase().includes(search) || message.attributes.chefs_name.toLowerCase().includes(search)) {
        return true 
        }   
      })
      
      if (search.length > 0) {
        setFilteredMessages(filteredData);
      } else {
        setFilteredMessages(messages)
      }
  }


  async function deleteMsg(id) {
    const confirmDelete = window.confirm("Delete the message permanently?");

    if (confirmDelete) {
      try {
      const response = await axios.delete(messages_URL + "/" + id, 
      { headers: {
        Authorization: `Bearer ${auth.data.jwt}`,
      }});
      const newArr = messages.filter( (message) => {
        return message.id !== id
        })
        setFilteredMessages(newArr);
        setMessages(newArr);
      } catch(error) {
        console.log(error);
      }
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
        {/* <FontAwesomeIcon icon={solid('search')} className="search-icon" /> */}
      </div>
      <div id="recipeListContainer">
        {search.length >= 1 
            ? (
            filteredMessages.map( (message) => {
              const {id, attributes} = message
              return (
                <>
                  <MessageAccordion key={id} name={attributes.chefs_name} title={attributes.title} message={attributes.message} subject={attributes.subject} deleteMessage={() => deleteMsg(id)} />
                </>
            )  
            }) 
          ) : (
              messages.map( (message) => {
                const {id, attributes} = message
                console.log(messages)
                return (
                  <>    
                    <MessageAccordion key={id} name={attributes.chefs_name} title={attributes.title} message={attributes.message} subject={attributes.subject} deleteMessage={() => deleteMsg(id)}/>
                  </>
                )
              }).reverse()  
            )
      } 
      </div>
    </>
  )
}

export default Messages
