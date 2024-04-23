import React from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {

    const [state, setState] = React.useState("Login");
    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
    })

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const login = async () => {
        console.log("Login", formData);

        let responseData;
        await fetch("http://localhost:4000/login", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => responseData = data);

        if(responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            window.location.replace("/");
        }
        else {
            alert(responseData.error)
        }
    }

    const signup = async () => {
        console.log("Signup", formData);
        
        let responseData;
        await fetch("http://localhost:4000/signup", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => responseData = data);

        if(responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            window.location.replace("/");
        }
        else {
            alert(responseData.error)
        }
    }
    
        return(
            <div className="login-signup">
               <div className="loginsignup-container">
                <h1>{state}</h1>
                <form action="#" className="loginsignup-fields">
                    {state === "Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" id="" />:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" id="" />
                </form>

                <button onClick={() => {state==="Login" ? login() : signup()}} type="submit" className="loginsignup-submit" > Continue </button>

                {state === "Sign Up"
                ?<p className="loginsignup-login">Already Have an Account? <span onClick={() => setState("Login")}>Login Here</span></p>
                :<p className="loginsignup-login">Create an Account? <span onClick={() => setState("Sign Up")}>Click Here</span></p>}

                <form action="#" className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, i agree to the terms of use & Privacy Policy</p>
                </form>
               </div>
            </div>
        )
    }

export default LoginSignup;