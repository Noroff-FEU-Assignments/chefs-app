function ToDo(todo) {
  console.log(todo)
  return (
    <div className={todo.complete ? "done" : ""}>
      {todo.todo}
    </div>
  )
}

export default ToDo;
