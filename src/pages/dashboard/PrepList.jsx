import { useState, useEffect } from "react";
import SubHeadingPage from "../../components/layout/SubHeadingPage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { api } from "../../constants/api.js";


function PrepList({}) {
  const [value, setValue] = useState("");
  const [prepItems, setPrepItems] = useState([]);
  const [checked, setChecked] = useState()

  const url = api + "/prep-lists";

  useEffect( () => {
    async function getPrepItems() {
      try {
        const response = await axios.get(url)
        setPrepItems(response.data.data);

      } catch(error) {
        console.log(error);
      }
    }
    getPrepItems();
  }, []);


  function handleInput(e) {
    setValue(e.target.value);
  }
  
  async function handleSubmit(e) {
    e.preventDefault();

    if (!value) {
      return
    } else {
      try {
        const putItem = await axios.post(url,
          { data: {
            Item: value, 
            done: false,
          },
        })
        const putItemDetails = putItem.data.data;
        setPrepItems([...prepItems, {
          id: putItemDetails.id,
          attributes: {
              Item: putItemDetails.attributes.Item, 
              done: putItemDetails.attributes.done
            } 
          }
        ])
        
      } catch(error) {
        console.log(error);
      }
    }
    setValue("");
  }


  async function handleDelete(id) {
    try {
      const deleteItem = await axios.delete(url + "/" + id)
      const removeItem = prepItems.filter( (item) => {
        return item.id !== id;
      })
      setPrepItems(removeItem)
    } catch(error) {
      console.log(error);
    }
  }


  async function handleDone(id) {
    setChecked(!checked);
    
    try {
      const doneResponse = await axios.put(url + "/" + id, {
        data: {
          done: checked
        }
        
      })
      setPrepItems( (prevState) => {
        return prevState.map( (item) => {
          if (item.id === id) {
            return { ...item, isDoneLocal: !item.isDoneLocal};
  
          } else {
            return item;
          }
        })
      })
    } catch(error) {
      console.log(error);
    }
  }
 
  function sortPreps(a, b) {
    return a.id - b.id;
  }
  
  return (
    <>
    <SubHeadingPage>Prep-List</SubHeadingPage>
      <Form onSubmit={handleSubmit} id="prepListForm">
          <Form.Control type="text" value={value} id="prepListInput" onChange={handleInput}  placeholder="Add to list" />
          <Button id="prepListBtn" type="submit">Add</Button>
      </Form>    
      
        {prepItems.sort(sortPreps).map( (item) => {
          return (
            <div key={item.id} className="prep-list-item">
                <div style={{textDecoration: item.attributes.done || item.isDoneLocal ? "line-through" : "", textDecorationColor: item.attributes.done || item.isDoneLocal ? "#BA2126" : ""}}
                    onClick={ () => handleDone(item.id) } >
                      {item.attributes.Item}
                </div>                  
                <button type="button" onClick={() => {handleDelete(item.id)}}>x</button>
            </div>
          )
          })
        }      
    </>
  )
}

export default PrepList;
