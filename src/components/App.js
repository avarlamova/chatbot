import React, { useState } from 'react';
import Login from './loginpage';
import useLocalStorage from '../hooks/localstorage.js' ;
import Screen from './screen'


function App() {

  const [login, setLogin] = useState();

  return (
      <div> 
        <Screen 
        login = {login}
        />
        <Login onLoginSubmit = {setLogin} />
        </div>
  );
}

export default App;
