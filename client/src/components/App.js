import React from 'react';
import Login from './loginpage';
import useLocalStorage from '../hooks/localstorage.js' ;
import Sidebar from './sidebar';
import {ContactsProvider} from '../contexts/contactsProvider'
import {ChatsProvider} from '../contexts/chatsProvider';
import ConversationWindow from './conversationWindow';
import { SocketProvider } from '../contexts/socketProvider';

function App() {

  const [login, setLogin] = useLocalStorage('login');

  const screen = (
    <SocketProvider login = {login}> 
      <ContactsProvider>
        <ChatsProvider login = {login}>
          <div className="d-flex">
          <Sidebar login = {login} />
          <ConversationWindow /> 
          </div>
        </ChatsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
      <div> 
        {login ? screen : <Login setLogin = {setLogin} />}
        </div>
  );

}

export default App;
