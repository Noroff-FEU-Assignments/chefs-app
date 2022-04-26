import HeadingPage from "../../components/layout/HeadingPage.js";
import { Helmet } from "react-helmet";
import { Parser } from "marked";
import { useState, useEffect} from "react";
import Spinner from "react-bootstrap/Spinner";
import Component from "react"

const RSS_url = "https://www.mattilsynet.no/mat_og_vann/?service=rss";

// let Parser = require('rss-parser');
// let parser = new Parser();

function Dashboard() {
  // const [loading, setLoading] = useState(true)

  // useEffect( () => {
  //   async function getNews() {
  //     try {
  //       const response = await parser.parseURL(RSS_url);

  //       console.log(response)
  //     } catch(error) {
  //       console.log(error)
  
  //     } finally {
  //       setLoading(false)
  //     }
  
  //   }
  //  getNews() 
  // }, [RSS_url])

  // if (loading) {
  //   return <Spinner animation="glow" />
  // }


  return (
    <>
      <Helmet>
        <title>Dashboard | Chef's App</title>
      </Helmet>
      <HeadingPage>Dashboard</HeadingPage>
      
      
    </>
  )
}

export default Dashboard
