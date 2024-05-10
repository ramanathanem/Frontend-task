// Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(' http://localhost:5009/files/register ', {
        username,
        password,
      });
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2 className='text-center'>Register</h2>
      <form onSubmit={handleSubmit} className='text-center container'>
        <input type="text" placeholder="Username" className='form-control'
         value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br/>
        <input type="password" placeholder="Password" className='form-control'
         value={password} onChange={(e) => setPassword(e.target.value)} required />
       <br/>
        <button type="submit" className='btn btn-primary'>Register</button>
      </form>

      
    </div>
  );
};

export default Register;
