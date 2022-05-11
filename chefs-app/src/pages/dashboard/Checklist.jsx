import { api } from "../../constants/api";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { useState, useEffect } from "react";
import axios from "axios";


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
      {routines.map( (routine) => {
        return(
          <>
          <div>
            <input type="checkbox" />
            {routine.attributes.name}
          </div>
          </>
        )
      })}
    </>
  )
}

export default Checklist
