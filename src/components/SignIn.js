import React, { useState } from "react";

function SignIn(props){

    let ifRegistered = false;

    const [loginText, setLogin] = useState("");
    const [registerText, setRegister] = useState("");

    function handleChange(event){
        const whichToChange = event.target.name;
        if(whichToChange === "registerInfo" ){
            setRegister(event.target.value);
        } else{
            setLogin(event.target.value);
        }
    }

    function handleClick(event){
        const whichToChange = event.target.name;
       
        if(whichToChange === "registerButton" ){
            props.onRegister(registerText);
            ifRegistered = true;
        } else{
            props.onLogin(loginText);
        }
    }

    return(
    <div>
        <p>Either register a non-existing user or login with existing credentials</p>
        <div className="single-sign-in">
            <input 
            name="registerInfo"
            value={registerText}
            onChange={handleChange}/>
            <button name="registerButton" onClick={handleClick}>Register</button>
            {ifRegistered && <p>You are successfully registered</p> }
        </div>

        <div className="single-sign-in">
            <input
            name="LoginInfo"
            value={loginText}
            onChange={handleChange} />
            <button name="loginButton" onClick={handleClick}>Login</button>
        </div>

    {/* <p>After loggining in, press authenticate to start using the service</p>
        <div className="single-sign-in">
            <button>Authenticate</button>
        </div>
        <div className="single-sign-in">
            <button>Authenticate</button>
        </div> */}
    </div>)
};

export default SignIn;