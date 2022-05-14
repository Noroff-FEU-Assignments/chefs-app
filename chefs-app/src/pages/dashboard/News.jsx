import SubHeadingPage from "../../components/layout/SubHeadingPage.jsx";
import { Helmet } from "react-helmet";
import { Parser } from "marked";
import { useState, useEffect} from "react";
import Spinner from "../../utilities/Spinner.jsx";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { api } from "../../constants/api.js";


const RSS_url = "https://www.mattilsynet.no/mat_og_vann/?service=rss";

// let Parser = require('rss-parser');
// let parser = new Parser();

function News() {
  const url = api + "/announcements";

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect( () => {
    async function getAnnouncements() {
      try {
        const response = await fetch(url)

        if(response.ok) {
          const results = await response.json();
          // console.log(results);
          setAnnouncements(results.data);
          
        }

      } catch(error) {
        console.log(error);
        <SystemMessage type={"message error"} content={"Something went wrong"} />

      } finally {
        setLoading(false);
      }
    }
    getAnnouncements();
  }, [url])

  
  if(loading) {
    return <Spinner />
  };


  return (
    <>
    <SubHeadingPage>News</SubHeadingPage>
      {announcements.map( (announcement) => {
        return (
        <div key={announcement.id} className="announcements-item">
          <h3 className="announcements-title">{announcement.attributes.title}</h3>
          <p className="announcements-content">{announcement.attributes.announcement}</p>
        </div>
        )
      })}
    </>
  )
}

export default News;
