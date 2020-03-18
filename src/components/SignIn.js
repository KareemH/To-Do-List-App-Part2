import React, { useState } from "react";

function SignIn(props){
    // Stateful elements
    const [loginText, setLogin] = useState("");
    const [registerText, setRegister] = useState("");

    // When either a register or login input text is updating, we must update its state as well
    function handleChange(event){
        // Determine if we are handling change of either register or login
        const whichToChange = event.target.name;
        // Conditional to determine which stateful element should update its state
        if(whichToChange === "registerInfo" ){
            setRegister(event.target.value);
        } else{
            setLogin(event.target.value);
        }
    }

    // When a user clicks on either the register or logn button
    function handleClick(event){
        // Determine if we are dealing with either register or login
        const whichToChange = event.target.name;
        // Conditional to determine which props functon to invoke
        if(whichToChange === "registerButton" ){
            props.onRegister(registerText);         // Invoke the onRegister function in App.js
        } else{
            props.onLogin(loginText);               // Invoke the onLogin funciton in App.js
        }
    }

    // What to return in place of the SignIn component in App.js
    return(
    <div>
        <p>Either register a non-existing user or login with existing credentials</p>
        {/* Register area */}
        <div className="single-sign-in">
            <input 
            name="registerInfo"
            value={registerText}
            onChange={handleChange}/>
            <button name="registerButton" onClick={handleClick}>Register</button>
        </div>

        {/* Login area */}
        <div className="single-sign-in">
            <input
            name="LoginInfo"
            value={loginText}
            onChange={handleChange} />
            <button name="loginButton" onClick={handleClick}>Login</button>
        </div>

    </div>)
};

export default SignIn;