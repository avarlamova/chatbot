import React, {useContext, useState} from 'react'
import useLocalStorage from '../hooks/localstorage';
import {useContacts} from '../contexts/contactsProvider'

const ChatsContext = React.createContext()

export function useChats() {
  return useContext(ChatsContext)
}

export function ChatsProvider({login, children}) {

  const [chats, setChats] = useLocalStorage('chats', []);
  const [chatIndex, setChatindex] = useState(0);
  const {contacts} = useContacts();

  function createChat(receivers) {
    setChats(prevChats => {
      return [...prevChats, {receivers, messages: [] }]
    })
  }

  function sendMessage (receivers, message) {
    addMessageToChat({receivers,message, sender: login})
  }

  function addMessageToChat({receivers, message, sender: login}) {
    setChats(prevChats => {
      const newMessage = {sender, message}
      let hasChanged = false;
      if (hasChanged) {
//
      }
      else return [...prevChats, {receivers, messages: [newMessage]}]
    })
  }


  const formattedChats = chats.map((chat, index) => {
    const receivers = chat.receivers.map(receiver => {
      const contact = contacts.find(contact => {
        return contact.login === receiver
      })
    const name = (contact && contact.name) || receiver
    return {login: receiver.login, name}
    })
    const isSelected = index === chatIndex
    return {...chat, receivers, isSelected }
  })

  const value = {
    chats: formattedChats,
    selectChat: setChatindex,
    selectedChat: formattedChats[chatIndex],
    createChat,
    sendMessage
  }

  return (
    <ChatsContext.Provider value={value}>
    {children}
    </ChatsContext.Provider>  
  )
}

