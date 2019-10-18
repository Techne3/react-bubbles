import React,{useState} from "react";
import axiosWithAuth from '../utils/axiosWithAuth'
import axios from 'axios'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: '', 
});

  const changeHandle = e => {
    setCredentials({
      ...credentials, 
      [e.target.name]:e.target.value,
    })
  }

  const submitHandle = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`http://localhost:5000/api/login`, credentials)
    .then(res => {
      // console.log(res.data)
      localStorage.setItem('token', res.data.payload);
    })
    .catch(err => console.log(err.response))
  }



  return (
    <div className="loginForm">
        <form onSubmit={submitHandle}>
            <input 
            type='text'
            name='username'
            placeholder='username'  
            value={credentials.username}
            onChange={changeHandle}
            />
            <input 
            type='password'
            name='password'
            placeholder='password'  
            value={credentials.password}
            onChange={changeHandle}
            />
            <button type='submit'>Login</button>
        </form>
        </div>
  );
};

export default Login;
