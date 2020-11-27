import React, { useState, useEffect } from 'react';
import Login from './loginpage';
import useLocalStorage from '../hooks/localstorage.js' ;
import Sidebar from './sidebar';
import {ContactsProvider} from '../contexts/contactsProvider'
import {ChatsProvider} from '../contexts/chatsProvider';
import {useChats} from '../contexts/chatsProvider'
import ConversationWindow from './conversationWindow';

function App() {

  const [login, setLogin] = useLocalStorage('login');
  const selectedChat = true;

  const screen = (
    
    <ContactsProvider>
    <ChatsProvider login = {login}>
      <div className="d-flex">
      <Sidebar login = {login} />
      {selectedChat ? <ConversationWindow /> : <div>{'chat not selected'}</div>}
      </div>
    </ChatsProvider>
    </ContactsProvider>
  )

  return (
      <div> 
        {login ? screen : <Login setLogin = {setLogin} />}
        </div>
  );

}

export default App;
