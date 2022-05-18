import { api } from "../../constants/api";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import SubHeadingPage from "../../components/layout/SubHeadingPage";
import Routine from "./Routine.jsx";


function Checklist() {
  const url = api + "/routines";
  const [routines, setRoutines] = useState([]);
  const [sort, setSort] = useState([]);
  console.log(routines)
  
  useEffect( () => {
    async function getRoutines() {
      try {
        const response = await axios.get(url);
        console.log(response);
        setRoutines(response.data.data); 
  

        // const sortArray = (type) => {
        //   const types = {
        //     // name: ,
        //   };
    
        //   const sortProperty = types[type];
        //   const sorted = [...routines].sort((a,b) => b[sortProperty] - a[sortProperty]);
        //   setSort(sorted);
        // };
        // sortArray(sort);

      } catch(error) {
        console.log(error);
      } 


    }
    getRoutines()
  }, [url])


  
    const sortedArray = [...routines].sort((a,b) => a - b)
    console.log(sortedArray)
 
  // useEffect( () => {
  //   const sortArray = (type) => {
  //     const types = {
  //       name: name,
  //     };

  //     const sortProperty = types[type];
  //     const sorted = [...routines].sort((a,b) => b[sortProperty] - a[sortProperty]);
  //     setSort(sorted);
  //   };
  //   sortArray(sort);
  // }, [sort]);


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
