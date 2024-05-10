import React from 'react'
import "../Style/Admin.css"
import { Link } from 'react-router-dom'
const Admin = () => {
  return (
    <div>
        <h1>DashBord</h1>
       <Link to='/home'> <button className='create'>Create Employee</button></Link> 
        <p className='admin'>Welcome to Admin panel</p>
        
    </div>
  )
}

export default Admin