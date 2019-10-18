import React,{useState} from "react";
import axiosWithAuth from '../utils/axiosWithAuth'
import axios from 'axios'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: '', 
})

const handleChanges = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
}

    const submitHandler = e => {
      e.preventDefault()
      axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubble')
      })
      .catch(err => console.log(err))
    }

    return ( 
        <div className="loginForm">
        <form onSubmit={submitHandler}>
            <input 
            type='text'
            name='username'
            placeholder='username'  
            value={credentials.username}
            onChange={handleChanges}
            />
            <input 
            type='password'
            name='password'
            placeholder='password'  
            value={credentials.password}
            onChange={handleChanges}
            />
            <button type='submit'>Login</button>
        </form>
        </div>
     );
}

export default Login;
