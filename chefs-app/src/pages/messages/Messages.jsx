import HeadingPage from "../../components/layout/HeadingPage.jsx";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { useState, useEffect } from "react";
import SystemMessage from "../../utilities/SystemMessage.js";
import Spinner from "react-bootstrap/Spinner";


const messages_URL = api + "/messages";


function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true);
  


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
    <Spinner animation="grow" />
  }





  return (
    <>
      <Helmet>
        <title>Messages | Chef's App</title>
      </Helmet>
      <HeadingPage>Messages</HeadingPage>

    
    </>
  )
}

export default Messages
