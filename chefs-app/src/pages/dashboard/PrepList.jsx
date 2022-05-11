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
    <SubHeadingPage>Testing to do</SubHeadingPage>
      <Form onSubmit={handleSubmit}>
          <Form.Control type="text" value={value} className="input" onChange={handleInput}  placeholder="Add to list" />
          <Button type="submit">+</Button>
      </Form>    
        {items.map( (item) => {
          return (
            <>
              <div key={item.id}>
                <span style={{textDecoration: item.isdone ? "line-through" : ""}}
                      className="to-do-span"
                      onClick={ () => handleDone(item.id) }>
                      {/* onClick={ (item) => {item.isdone = setDone((prevState) => !prevState)}}> */}
                      {/* onClick={(item.isdone) => setDone(true)}> */}
                      {item.text}
                </span> 
                <button onClick={() => {handleDelete(item.id)}}>X</button>
              </div>              
            </>
          )
          })
        }
    </>
  )
}

export default PrepList;
