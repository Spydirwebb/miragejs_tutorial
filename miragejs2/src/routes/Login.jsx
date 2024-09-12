import { useState } from "react";

const Login =() => {
    const [input, setInput] = useState({
        username: "",
        password: "",
      });
    const [user, setUser] = useState(null)
    
    const loginAction = async() => {
        try{
            const response = await fetch("auth/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            })
            const res = await response.json()
            if(res.data){
                setUser(data.name)
                console.log(res.token)
            }
        } catch (err) {
            console.log(err)
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
                <button className="btn-submit">Submit</button>
            </form>
        </div>
    )
}

export default Login