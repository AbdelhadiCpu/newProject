import React, { Component } from 'react'
import './menu.css'
import {useNavigate} from 'react-router-dom'


function Menu2()  {

    

        const navigate = useNavigate()
    const StoredToken = localStorage.getItem('token')
    const room = '/board/' + StoredToken.substring(20, 30)



      
        return (
            <div className="navbar">
                <div className="dropdown">
                    <p id='logo'>LOGO</p>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">menu5
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a onClick={()=>{navigate('/firstpage')}} href="">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">menu6
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a onClick={() => { navigate(room) }} href="">Board-Room</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">menu7
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">menu8
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">menu9
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">menu10
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">menu11
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button className='connect'>se-deonnecter</button>
                </div>
            </div>
        )
    
}
export default Menu2
