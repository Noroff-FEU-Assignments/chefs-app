import axios from "axios";
import { useState, useEffect } from "react";
import { api } from "../../constants/api.js";


function ToDoItem({itemId, item, done}) {
  const url = api + `/prep-lists/${itemId}`;

  const [checked, setChecked] = useState(done);

  function updateList() {
  }
  
  
  async function handleDone() {
    setChecked((prevChecked) => !prevChecked);

    try {
      const doneResponse = await axios.put(url, {
        data: {
          done: checked
        }
      })
      console.log(doneResponse)
    } catch(error) {
      console.log(error);
    }
  }
  

  async function handleDelete(id) {
        try {
          const deleteItem = await axios.delete(url + "/" + id)
        } catch(error) {
          console.log(error);
        }
      }


  return (
    <>
      {/* <div key={item.id} className="prep-list-item"> */}
          <div style={{textDecoration: item.isdone ? "line-through" : "", textDecorationColor: item.isdone ? "#BA2126" : ""}}
              onClick={ () => handleDone() }>
                {item}
          </div>                  
          <button type="button" onClick={() => {handleDelete(item.id)}}>x</button>
      {/* </div> */}
    </>
  )
}

export default ToDoItem
