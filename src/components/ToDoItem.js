import React from "react";

function ToDoItem(props) {
  return (
    <div className="an-item" 
    //   onClick={() => {
    //     props.onChecked(props.id);
      //}}
    >
        <li style={{textDecoration: props.completed ? "line-through" : "none"} } >{props.text}</li>
      

      <div className="delete-button">
        <button onClick={() => {
        props.onComplete(props.id);
      }} >Complete?</button>
        <button onClick={() => {
        props.onDelete(props.id);
      }}> Delete?</button>
      </div>
      
    </div>
  );
}

export default ToDoItem;