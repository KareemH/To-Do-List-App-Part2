import React, { useState } from "react";

function InputArea(props) {
  /* From 1, we copy the input specific code from App.js */
  const [inputText, setInputText] = useState("");
  /* This function will get called when the input changes (as in something is typed into input which causes change)
  Event is the instance that called the function handleChange
  Of that event, a target which is the input tag is also sent
  Of tha input tag, we pass along its value attribute*/
  function handleChange(event) {
    const newValue = event.target.value;
    // Call setInputText to update inputText's state with newValue
    setInputText(newValue);
  }

  // What to return in place of the InputArea component in App.js
  return (
    <div className="form">
      {/* 1. In input, we have an onChange that detects when the input updates
        So, input and onChange can be managed within this componenet and keep it local
        Emphasis of passing around data is when the button is clicked and then we pass whatever is in the input into the items array of App.jsx
        Look above for continuation */}
      <input onChange={handleChange} type="text" value={inputText} />

      {/* 2. When this button gets clicked, we want to be able to add a new item aka the current value of inputText to items array
          <button onClick={addItem}>
            <span>Add</span>
          </button>
      -But addItem is a function that resides in the App.jsx/App component
      -We should leave addItem in the top level of the DOM tree and keeping it in the App component
      -We need a way to call the addItem function and pass over inputText to App.jsx
      -How can we invoke the addItem function within a child component? Use props and go to App.jsx to add addItem as property to <InputArea/ > component
      
      -Now that InputArea sends over the onAdd function as a prop, we can access it
        -Make sure the component passes over a props object
      function InputArea(props) {       Ensure props is an objecy
      <button onClick={props.onAdd}>    Utilize props to access onAdd

      So, we have to pass the inputText as an argument to onAdd only when the button is clicked
      -Use anonymous arrow function so that onAdd isn't called instanteously
      -We call props.onAdd(inputText) which is really an InputArea component calling onAdd remotely and passing along a new inputText
     - We modify the function in app.js like so
          function addItem(inputText) {
            setItems(prevItems => {
            return [...prevItems, inputText];
          });
        }
      -In the array items, inputText is appeneded to the array when all remaining elements is just a copy of the previous state of array elements
 
      */}
      <button
        onClick={() => {
          props.onAdd(inputText);
          // Make sure to reset the inputText to an empty string
          setInputText("");
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;