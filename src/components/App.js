import React, { useState, useEffect } from 'react';
import Login from './loginpage';
import useLocalStorage from '../hooks/localstorage.js' ;
import Screen from './screen';
import Newchat from './newchat';



function App() {

  const [login, setLogin] = useLocalStorage('login');

  return (
      <div> 
        {login ? <Screen login = {login}/>: <Login setLogin = {setLogin} />}
        </div>
  );

}

export default App;
