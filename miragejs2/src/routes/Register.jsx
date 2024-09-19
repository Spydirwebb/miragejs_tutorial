import { useState } from "react";
import { Link } from "react-router-dom";

const Register =() => {
    const [input, setInput] = useState({
        username: "",
        password: "",
        confirmPassword: ""
      });

    const [passMatch, setPassMatch] = useState(true)
    
    const loginAction = async() => {
        if(passMatch) {
            try{
                const response = await fetch("auth/register", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(input)
                })
                const res = await response.json()
                if(res.data){
                    console.log(res.data)
                    setUser(res.data.name)
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            setPassMatch(false)
        }   
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        loginAction()
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
        [name]: value,
    }));
    }
    const checkPasswordMatch = () => {
        if (input.password === input.confirmPassword) {
            return true
        }
        else {
            return false
        }
    }

    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form_control">
                    <label htmlFor="user-username">username:</label>
                    <input
                    type="text"
                    id="user-username"
                    name="username"
                    placeholder="example"
                    aria-describedby="user-username"
                    aria-invalid="false"
                    onChange={handleInput}
                    />
                    <div id="user-username" className="sr-only">
                    Please enter a valid username. It must contain at least 6 characters.
                    </div>
                </div>
                <div className="form_control">
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={handleInput}
                    />
                    <div id="user-password" className="sr-only">
                    your password should be more than 6 character
                    </div>
                </div>
                <div className="form_control">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                    type="confirmPassword"
                    id="confirmPassword"
                    name="confirmPassword"
                    aria-describedby="user-confirmPassword"
                    aria-invalid="false"
                    onChange={handleInput}
                    />
                    <div id="user-confirmPassword" className="sr-only">
                    your password should be more than 6 character
                    </div>
                </div>
                <button className="btn-submit">Submit</button>
            </form>
            {passMatch ? "" :<p>Passwords do not match</p>}
            {}
        </div>
    )
}

export default Register