import HeadingPage from "../../components/layout/HeadingPage.jsx";
import { Helmet } from "react-helmet";
import { Parser } from "marked";
import { useState, useEffect} from "react";
import Spinner from "../../utilities/Spinner.jsx";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { api } from "../../constants/api.js";
import News from "./News.jsx"
import PrepList from "./PrepList.jsx"
import Checklist from "./Checklist.jsx"


function Dashboard() {
  
  return (
    <>
      <Helmet>
        <title>Dashboard | Chef's App</title>
      </Helmet>
      {/* <HeadingPage>Dashboard</HeadingPage> */}
      <div id="dashboardContainer">
        <div id="prepListContainer">
          <PrepList  />
        </div>
        <div id="checkListContainer">
          <Checklist />
        </div>
        <div id="newsContainer">
          <News />
        </div>
      </div>
      
    </>
  )
}

export default Dashboard
