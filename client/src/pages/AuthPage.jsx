import React, { useState } from 'react'
import { auth } from '../axiosInstances'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
    const navigate = useNavigate()
    const [loginFormData, setLoginFormData] = useState({
        username: "kraig18",
        password: "password"
    })

    function handleLoginFormChange(event) {
        const {name, value} = event.target
        setLoginFormData(prevLoginFormData => ({
            ...prevLoginFormData,
            [name]: value
        }))
    }


    function handleLoginFormSubmit(event) {
        event.preventDefault()
        auth.post("login", loginFormData)
            .then(response => {
                // set JWT token
                sessionStorage.setItem("jwt", response.data)
                //
                navigate("/")
            })
            .catch(error => {
                console.error(error.response.status)
                alert("Either username or password is invalid")
            })
    }

  return (
    <div>
        <form onSubmit={handleLoginFormSubmit}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={loginFormData.username}
                onChange={handleLoginFormChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginFormChange}
            />
            <button>Login</button>
        </form>
    </div>
  )
}
