import React, {useContext} from 'react'
import useLocalStorage from '../hooks/localstorage';
import {useContacts} from './contactsProvider'

const ChatsContext = React.createContext()

export function useChats() {
  return useContext(ChatsContext)
}

export function ChatsProvider({login, children}) {

const {contacts} = useContacts();
const [chats, setChats] = useLocalStorage('chats', [])

const displayedChats = chats.map(chat=> {
    const receivers = chat.receivers.map((receiver)=> {
        const contact = contacts.find(contact => {
            return contact.login === receiver
        }) 
    const name = (contact&&contact.login)||receiver
    return {id: login, name}
    });
    return {...chat, receivers }
 })



  function createChat(receivers) {
    setChats(prevChats => {
      return [...prevChats, {receivers, messages: [] }]
    })
  }

  return (
    <ChatsContext.Provider value={{displayedChats, createChat}}>
    {children}
    </ChatsContext.Provider>  
  )
}




