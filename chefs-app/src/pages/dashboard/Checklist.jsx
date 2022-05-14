import { api } from "../../constants/api";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import SubHeadingPage from "../../components/layout/SubHeadingPage";
import Routine from "./Routine.jsx";


function Checklist() {
  const url = api + "/routines";
  const [routines, setRoutines] = useState([]);
  console.log(routines)
  
  useEffect( () => {
    async function getRoutines() {
      try {
        const response = await axios.get(url);
        setRoutines(response.data.data); 
  
      } catch(error) {
        console.log(error);
      } 


    }
    getRoutines()
  }, [url])



  return (
    <>
    <SubHeadingPage>Routines</SubHeadingPage>
      {routines.map( (routine) => {
        const {id, attributes} = routine;
        return(
          <Routine key={id} routineId={id} name={attributes.name} done={attributes.done}/>
        )
      })}
    </>
  )
}

export default Checklist
