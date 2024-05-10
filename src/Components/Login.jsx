// Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(' http://localhost:5009/files/login', {
        username,
        password,
      });
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2 className='text-center'>Login</h2>
      <form onSubmit={handleSubmit} className='text-center container'>
        <input type="text" className='form-control' placeholder="Username"
         value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br/>
        <input type="password" className=' form-control' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
       <br/>
        <button type="submit" className='btn btn-primary'>Login</button>
      </form>
    </div>
  );
};

export default Login;
