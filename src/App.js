import React from 'react'
import {Route, Routes } from 'react-router-dom';
//import LogIn from './components/Login/login';
//import Menu1 from './components/Menu/menu1';
import LogIn from './components/Login/login';
import SignUp from './components/SingUp/signup';
import Menu2 from './components/Menu/menu2';
import ReSet from './components/Reset/reset';

import BoardList from './components/board/board';







function App(){

  const StoredToken = localStorage.getItem('token')
  const room = '/board/' + StoredToken.substring(20, 30)
  return(

   <>

    <Routes>
    <Route  exact path='/' element={<LogIn/>}/>
    <Route exact path = '/home' element={<Menu2/>}/>
    <Route  exact path = '/register' element={<SignUp/>}/>
    <Route exact path='/reset' element={<ReSet />} />
    <Route exact path ={room} element={<BoardList/>}/>
    
   
    </Routes>

  

   </>
    

  );
}
export default App
