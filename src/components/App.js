import React, { useState } from 'react';
import Login from './loginpage';
import useLocalStorage from '../hooks/localstorage.js' ;
import Screen from './screen';
import Newchat from './newchat';



function App() {

  const [login, setLogin] = useState();

  return (
      <div> 
        <Screen 
        login = {login}
        />
        <Login onLoginSubmit = {setLogin} />
        <Newchat />
        </div>
  );

}

export default App;
