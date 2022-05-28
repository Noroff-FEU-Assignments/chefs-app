import { api } from "../../constants/api";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SubHeadingPage from "../../components/layout/SubHeadingPage";
import Routine from "./Routine.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthContext from "../../utilities/AuthContext";



function Checklist() {
  const url = api + "/routines";
  const [routines, setRoutines] = useState([]);
  const [value, setValue] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  
  
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
  }, [])


  async function handleSubmit(e) {
    e.preventDefault();

    if (!value) {
      return
    } else {
      try {
        const putItem = await axios.post(url,
          { data: {
            name: value, 
            done: false,
          },
        })
        const putItemDetails = putItem.data.data;
        setRoutines([...routines, {
          id: putItemDetails.id,
          attributes: {
              name: putItemDetails.attributes.name, 
              done: putItemDetails.attributes.done
            } 
          }
        ])
        console.log(putItem)
      } catch(error) {
        console.log(error);
      }
      
    }
    setValue("");
  }


  function handleInput(e) {
    setValue(e.target.value);
  }




  function sortRoutines(a, b) {
    return a.id - b.id;
  }


  async function handleDelete(id) {
    const confirmDelete = window.confirm(`Delete routine permanently?`);

    if(confirmDelete) {
      try {
        const deleteItem = await axios.delete(url + "/" + id, 
        { headers: {
          Authorization: `Bearer ${auth.data.jwt}`,
        }})
  
        const removeItem = routines.filter( (item) => {
          return item.id !== id;
        })
        setRoutines(removeItem)
        console.log(deleteItem)
      } catch(error) {
        console.log(error);
      }
    }
  }

// Adding a routine if an admin is logged
  let addRoutineForm = "";
  if (auth && auth.data.user.email === "admin@admin.com") {
    addRoutineForm = <Form onSubmit={handleSubmit} id="prepListForm">
          <Form.Control type="text" value={value} id="prepListInput" onChange={handleInput}  placeholder="Add new routine" />
          <Button id="prepListBtn" type="submit">Add</Button>
      </Form>    

  }


  return (
    <>
    <SubHeadingPage>Routines</SubHeadingPage>
      {routines.map( (routine) => {
        const {id, attributes} = routine;
        routines.sort(sortRoutines)
        return(
          <Routine key={id} routineId={id} name={attributes.name} done={attributes.done} deleteRoutine={() => handleDelete(id)}/>
        )
      })}
      {addRoutineForm}
    </>
  )
}

export default Checklist
