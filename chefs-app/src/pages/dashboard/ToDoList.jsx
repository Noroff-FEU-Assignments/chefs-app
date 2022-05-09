import SubHeadingPage from "../../components/layout/SubHeadingPage.jsx";
// import ToDo from "./ToDo.jsx";
import data from "../../data.json";
import { useState } from "react";
import { Button, Card, Form } from 'react-bootstrap';


function Todo({ todo, index, markTodo, removeTodo}) {
  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  )

}

function FormTodo( {addTodo} ) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  )
}


function ToDoList() {
  const [todos, setTodos] = useState( [
  {
    text: "Sample",
    isDone: false
  }
]);

  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  }

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  return (
    <>
      <SubHeadingPage>Prep-List</SubHeadingPage>
      <FormTodo addTodo={addTodo} />
      <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>

    </>
  )
}

export default ToDoList
// function ToDoList() {
//   const [toDoList, setToDoList] = useState(data);

//   const handleToggle = (id) => {
//     let mapped = toDoList.map( (task) => {
//       return task.id === id ? { ...task, complete: !task.complete} : { ...task};
//     });
//     console.log("daddaw")
//     setToDoList(mapped)
//   }

//   return (
//     <>
//       <SubHeadingPage>Prep-List</SubHeadingPage>
//       {toDoList.map( (todo) => {
//         // console.log(todo.task)
//         return (
          
//           <> 
//             <ToDo todo={todo.task} handleToggle={handleToggle}/> 
//           </>
//           // {/* <div key={todo.id}>
//           //   {todo.task}
//           // </div> */}
         
//         )

//       })}
//     </>
//   )
// }

// export default ToDoList
