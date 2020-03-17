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
   
    
  const [items, setItems] = useState([]);
  const [authentication, setAuthenticaton] = useState("");

  function registerUser(potentialUser){
    axios.post("/api/user", {username: potentialUser}).then(response => {
        console.log(response);
    });
  }

  function loginUser(authorizedUser){
      axios.post("/api/auth",{username: authorizedUser}).then(response => {
        setAuthenticaton(response.data);
        console.log(response.data);

      }).catch(error => {
          console.log(error);
      });

    // axios.post("/api/user", {username: potentialUser}).then(response => {
    //     console.log(response);
    //   });
  }

  function getItems(){
    axios({
        method: "get",
        url: "/api/todo-item",
        headers:{
            "Authorization": authentication.token
        }
    }).then(response => {
        //setItems(response.data);
        setItems(response.data.filter( todoItem => {
            return todoItem.deleted === false;
        }))
        //console.log(response.data);
    }).catch(error => {
        setItems([]);
        console.log(error);
    });
  }

  function addItem(inputText) {
    axios({
        method: "post",
        url: "/api/todo-item",
        data: {content: inputText},
        headers:{
            "Authorization": authentication.token
        }
    }).then(response => {
        setItems(prevItems => {
            return [...prevItems, response.data];
          });
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
  }

  function deleteItem(id) {
    axios({
        method: "delete",
        url: "/api/todo-item/" + id,
        data: {deleted: true},
        headers:{
            "Authorization": authentication.token
        }
    }).then(response => {
        //setItems(response.data);
        getItems();
        console.log(response.data);
    }).catch(error => {
        console.log(error);
    });


    // setItems(prevItems => {
    //   return prevItems.filter((item, index) => {
    //     return index !== id;
    //   });
    // });
  }

  function handleAuthenticateClick(){
      axios({
          method: "get",
          url: "/api/todo-item",
          headers:{
              "Authorization": authentication.token
          }
      }).then(response => {
          //setItems(response.data);
          setItems(response.data.filter( todoItem => {
              return todoItem.deleted === false;
          }))
          console.log(response.data);
      }).catch(error => {
          setItems([]);
          console.log(error);
      });
  }

  function handleLogOutClick(){
      setItems([]);
      setAuthenticaton("");
  }

  function completeItem(todoItemID){
    axios({
        method: "put",
        url: "/api/todo-item/"+ todoItemID,
        data: {completed: true},
        headers:{
            "Authorization": authentication.token
        }
    }).then(response => {
        //setItems(response.data);
        // setItems(prevItems => {
        //     return [...prevItems, response.data];
        //   });
        // const newArray = items.map(todoItem => {

        //     return (todoItem.id === response.data.id) ? (todoItem.completed = response.data.completed) : todoItem;
        // })

        // setItems(newArray);
        getItems();
        console.log(response.data);

    }).catch(error => {
        console.log(error);
    });
  }

  return (
      
    <div>
    <h1>Welcome to the To Do App</h1>
    <div>
        <SignIn onRegister={registerUser} onLogin={loginUser} />
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
       

        <div className="container">
        <div className="heading">
            <h1>To-Do List</h1>
        </div>
        {/* Continuation of 2
        Add props to Input Area 
        Pass over the addItem function to the child component InputArea*/}
        <InputArea onAdd={addItem} />
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