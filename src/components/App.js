import React, { useEffect, useState } from "react";
import axios from "axios";

import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import SignIn from "./SignIn.js"

function App() {

    useEffect(() => {
        axios.get("/api/user").then(response => {
          console.log(response);
        });
      }, []);

      // Stateful elements
  const [items, setItems] = useState([]);
  const [authentication, setAuthenticaton] = useState("");
    
  //-----------------------------------------------------------------SignIn Component-----------------------------------------------------------
  // When a user registers their name in the SignIn component, the button will pass its value/registerText as a parameter to registerUser
  function registerUser(potentialUser){
      // Make a post request to the API to add the new user to the API's database
    axios.post("/api/user", {username: potentialUser}).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
  }

  // When a user logs in within the SignIn component, the button will pass its value/loginText as a parameter to loginUser
  function loginUser(authorizedUser){
      // Make a post request to authorize a pre-registered user and save the token to a stateful element
      axios.post("/api/auth",{username: authorizedUser}).then(response => {
        setAuthenticaton(response.data);        // Ensure that the stateful element, authentication, saves the token
        console.log(response.data);

      }).catch(error => {
          console.log(error);
      });
  }
//----------------------------------------------------------------------------------------------------------------------------------------------

  // Helper function to GET/retrieve all to-do items of a particular user
  // This helps when a change has possibly been made to an item (deleted/completed/insert)
  function getItems(){
      // GET request to retrieve all to-do items of an autheticated user (utilizing a token)
    axios({
        method: "get",
        url: "/api/todo-item",
        headers:{
            "Authorization": authentication.token
        }
    }).then(response => {
        setItems(response.data.filter( todoItem => {
            return todoItem.deleted === false;
        }))
    }).catch(error => {
        setItems([]);
        console.log(error);
    });
  }
//----------------------------------------------------------------------------------------------------------------------------------------------
    // After the token has been saved to the stateful element authentcate, user needs to click Use Service
    function handleAuthenticateClick(){
        // GET request to retrieve all to-do items of an autheticated user (utilizing a token)
        axios({
            method: "get",
            url: "/api/todo-item",
            headers:{
                "Authorization": authentication.token
            }
        }).then(response => {
            getItems();
        }).catch(error => {
            setItems([]);
            console.log(error);
        });
    }
    
    //-----------------------------------------------------------------InputArea Component-------------------------------------------------------------
    // A user may start writing in the InputArea component and inputText (the stateful element in InputArea.js) will constantly update as user inputs an item
    // When the Add button is clicked in InputArea.js, the current state of inputText is passed to addItem (via props which travels back to App.js) as an argument
  function addItem(inputText) {
      // POST request to add a single to-do item of an autheticated user (utilizing a token)
    axios({
        method: "post",
        url: "/api/todo-item",
        data: {content: inputText},
        headers:{
            "Authorization": authentication.token
        }
    }).then(response => {
        // Use spread operator to conveniently get the previous array elements and append the new item to the end
        setItems(prevItems => {
            return [...prevItems, response.data];
          });
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
  }

  //-----------------------------------------------------------------ToDoItem Component-------------------------------------------------------------
  // A user may want to complete a todoItem, but we want to update it in respect to the API
  // completeItem function is passed as a property to ToDoItem component, and it will be accessed via a prop in ToDoItem.js
  // A user will click the Complete Button in ToDoItem.js and the id of that to-do item is passed an argument to completeItem
  function completeItem(todoItemID){
      // PUT request to update a single to-do item as complete of an autheticated user (utilizing a token)
    axios({
        method: "put",
        url: "/api/todo-item/"+ todoItemID,
        data: {completed: true},
        headers:{
            "Authorization": authentication.token
        }
    }).then(response => {
        getItems();     // Re-retrieve the data from the API to reflect the changes
        console.log(response.data);

    }).catch(error => {
        console.log(error);
    });
  }

  // A user may want to delete a todoItem, but we want to delete it in respect to the API
  // deleteItem function is passed as a property to ToDoItem component, and it will be accessed via a prop in ToDoItem.js
  // A user wll click the Delete Button in ToDoItem.js and the id of that to-do item is passed as an argument to deleteItem
  function deleteItem(id) {
      // DELETE request to update a single to-do item as deleted of an autheticated user (utilizing a token)
    axios({
        method: "delete",
        url: "/api/todo-item/" + id,
        data: {deleted: true},
        headers:{
            "Authorization": authentication.token
        }
    }).then(response => {
        // Deleting on the API is a soft delete, so getItems() will filter and not display items that are marked deleted
        getItems();
        console.log(response.data);
    }).catch(error => {
        console.log(error);
    });
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------
  // When a user clicks on Log Out, the stateful components will be reset to empty
  function handleLogOutClick(){
      setItems([]);
      setAuthenticaton("");
  }
  //----------------------------------------------------------------------------------------------------------------------------------------------

  // What to return in place of the App component in index.js
  return (
      
    <div>
    {/* Starting title */}
    <h1>Welcome to the To Do App</h1>
    <div>
        {/* One component/div that displays register and login */}
        <SignIn onRegister={registerUser} onLogin={loginUser} />
        {/* Another div that displays Use Service and Log Out */}
        <div>
            <p>After logging in, press Use Service to start using the To-Do List App and then Log Out</p>
            <div className="single-sign-in">
                <button onClick={handleAuthenticateClick}>Use Service</button>
            </div>
            <div className="single-sign-in">
                <button onClick={handleLogOutClick}>Log Out</button>
            </div>
            </div>
        </div>
       
        {/* Actual To-Do App container */}
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>

            {/* Continuation of 2
            Add props to Input Area 
            Pass over the addItem function to the child component InputArea*/}
            <InputArea onAdd={addItem} />
            {/*  */}
            
            {/* Utilizing map operator to render every to-do item in the stateful items array */}
            <div>
                <ul>
                {items.map((todoItem, index) => (
                    <ToDoItem
                    key={index}
                    id={todoItem.id}
                    onComplete={completeItem}
                    completed={todoItem.completed}
                    deleted={todoItem.deleted}
                    text={todoItem.content}
                    onDelete={deleteItem}
                    />
                ))}
                </ul>
            </div>

        </div>
    </div>
  );
}

export default App;