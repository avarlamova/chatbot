import React, {useContext, useState} from 'react'
import useLocalStorage from '../hooks/localstorage';
import {useContacts} from '../contexts/contactsProvider'

const ChatsContext = React.createContext()

export function useChats() {
  return useContext(ChatsContext)
}

export function ChatsProvider({children}) {

  const [chats, setChats] = useLocalStorage('chats', []);
  const [chatIndex, setChatindex] = useState(0);
  const {contacts} = useContacts();

  function createChat(receivers) {
    setChats(prevChats => {
      return [...prevChats, {receivers, messages: [] }]
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
    createChat
  }

  return (
    <ChatsContext.Provider value={value}>
    {children}
    </ChatsContext.Provider>  
  )
}

