import React from 'react'

function ToDoItem(props) {
  const {item, done} = props;
  return (
    <>
      {/* <div key={item.id} className="prep-list-item"> */}
          <div style={{textDecoration: item.isdone ? "line-through" : "", textDecorationColor: item.isdone ? "#BA2126" : ""}}
              onClick={ () => handleDone(item.id) }>
                {item}
          </div>                  
          <button type="button" onClick={() => {handleDelete(item.id)}}>x</button>
      {/* </div> */}
    </>
  )
}

export default ToDoItem
