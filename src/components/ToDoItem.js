import React from "react";

function ToDoItem(props) {

  // What to return in place of the ToDoItem component in App.js  
  return (
    <div className="an-item">
        {/* Render the to do item as either line-through or not depending on whether it is completed */}
        <li style={{textDecoration: props.completed ? "line-through" : "none"} } >{props.text}</li>
      

        <div className="delete-button">
            {/* Complete button */}
            <button onClick={() => {
            props.onComplete(props.id);     // When Complete button is clicked, invoke onComplete function (belonging in App.js) while passing that to-do item's id
            }} >Complete?</button>

            {/* Delete button */}
            <button onClick={() => {
            props.onDelete(props.id);       // When Delete button is clicked, invoke onDelete function (belonging in App.js) while passing that to-do item's id
            }}> Delete?</button>
        </div>
      
    </div>
  );
}

export default ToDoItem;