import React, { useState, useEffect } from 'react';
import Login from './loginpage';
import useLocalStorage from '../hooks/localstorage.js' ;
import Screen from './screen';
import {ContactsProvider} from '../contexts/contactsProvider'



function App() {

  const [login, setLogin] = useLocalStorage('login');

  const screen = (
    
    <ContactsProvider>
      <Screen login = {login} />
    </ContactsProvider>
  )

  return (
      <div> 
        {login ? screen : <Login setLogin = {setLogin} />}
        </div>
  );

}

export default App;
