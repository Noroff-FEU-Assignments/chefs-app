import { useState, useEffect } from "react";
import SubHeadingPage from "../../components/layout/SubHeadingPage";
import useLocalStorage from "../../hooks/useLocalStorage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";




function PrepList() {
  const [items, setItems] = useLocalStorage("todos", [])
  const [value, setValue] = useState("");
  // const [done, setDone] = useState(false);
  console.log(items);
  
  function handleInput(e) {
    setValue(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    if (!value) {
      return
    } else {
      setItems([...items, {
        id: items.length + 1,
        text: value.trim(),
        isdone: false,
      }
      ]);
    }
    setValue("");
  }

  function handleDelete(id) {
    const removeItem = items.filter((item) =>{
      return item.id !== id;
    })
    setItems(removeItem);
  }


  function handleDone(id) {
    setItems( (prevState) => {
      return prevState.map( (item) => {
        if (item.id === id) {
          return { ...item, isdone: !item.isdone};
          // return { ...item, isdone: !item.isdone};
        } else {
          return item;
        }
      })
    })
  }
  
  return (
    <>
    <SubHeadingPage>Prep-List</SubHeadingPage>
      <Form onSubmit={handleSubmit} id="prepListForm">
          <Form.Control type="text" value={value} id="prepListInput" onChange={handleInput}  placeholder="Add to list" />
          <Button id="prepListBtn" type="submit">Add</Button>
      </Form>    
      
        {items.map( (item) => {
          return (
            <div key={item.id} className="prep-list-item">
                <div style={{textDecoration: item.isdone ? "line-through" : "", textDecorationColor: item.isdone ? "#BA2126" : ""}}
                    onClick={ () => handleDone(item.id) }>
                      {item.text}
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
