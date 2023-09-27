import React from "react";
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = ()=>{
    return (
        <div>
            <ul className="nav-ul"> 
                <li> <Link to='/'>Products</Link></li>
                <li> <Link to='/addproducs'>Add Products</Link></li>
                <li> <Link to='/updateproducts'>Update Products</Link></li>
                <li> <Link to='/logout'>Logout</Link></li>
                <li> <Link to='/profile'>Profile</Link></li>
                <li> <Link to='/signup'>SignUp</Link> </li>
            </ul>
        </div>
    )
}


export default Navbar;