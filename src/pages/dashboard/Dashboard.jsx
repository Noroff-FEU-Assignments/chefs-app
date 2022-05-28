import { Helmet } from "react-helmet";
import News from "./News.jsx"
import PrepList from "./PrepList.jsx"
import Checklist from "./Checklist.jsx"


function Dashboard() {
  
  return (
    <>
      <Helmet>
        <title>Dashboard | Chef's App</title>
      </Helmet>
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
