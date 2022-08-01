import React from "react";
//import {Link} from 'react-router-dom'
import Axios from 'axios';
import { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'
import {setRole} from 'react'
import swal from 'sweetalert'



function LogIn(){
    const navigate = useNavigate()

   const [loginStatus, setLoginStatus] = useState("");
  //  Axios.defaults.withCredentials = true;


    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
 

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            email: loginData.email,
            password: loginData.password,
        }).then((response) => {
            const token = response.data.token
            console.log(token)
            localStorage.setItem('token',token)
            console.log(response)
            if (response.data.message !== 'success' ) {
            //setLoginStatus(response.data.message);  
            swal('Oops!',response.data.message,'error')       
        } else {
            navigate('/home')
            swal('Congrats!',response.data.message,'success')
        }
    });
};



    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('uil-eye-slash')

    const handleToggle = () => {
        if (type === 'password') {
            setIcon('uil-eye');
            setType('text')
        }
        else {
            setIcon('uil-eye-slash')
            setType('password')
        }
    }

   

    const handleChange = (e) =>{
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(loginData);
    }


    /*useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setRole(response.data.user[0].role);
            
            }
        });
    }, []);*/



    return(
       <div className='lr'> 
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <h2 className={styles.formtitle}>
                        Authentification
                    </h2>
                    <div className={styles.control}>
                        <input
                            type="text"
                            className="f-email"
                            placeholder="E-mail"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                        />
                        <i className="uil uil-envelope icon"></i>
                    </div>

                    <div className={styles.control}>
                        <input
                            type={type}
                            className="f-password"
                            placeholder="password"
                            minLength='8'
                            name='password'
                            value={loginData.password}
                            onChange={handleChange}
                        />
                        <i onClick={handleToggle} className={icon}></i>
                    </div>
                    <div style={{ marginTop: '20px', marginLeft: '130px' }} className="g-recaptcha" data-sitekey="6LftKMYgAAAAAAkmgbzhGqCccfAa8TnZVNxQ5r-X"></div>
                    <button onClick={login} className={styles.logbtn}>Soumettre</button><br />

                    <a onClick={() => { navigate('/reset') }} className={styles.linkpass} href="">mot de passe oubliè </a>
                    <a onClick={() => { navigate('/register') }} className={styles.linkregister} href=''>S'inscrire</a>
                    <h2>{loginStatus}</h2>


                </form>
            </div>
       </div>
    )
}
export default LogIn




    