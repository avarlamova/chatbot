import React, {useContext, useState, useEffect, useCallback} from 'react'
import useLocalStorage from '../hooks/localstorage';
import {useContacts} from './contactsProvider';
import {useSocket} from './socketProvider'


const ChatsContext = React.createContext()

export function useChats() {
  return useContext(ChatsContext)
}

export function ChatsProvider({ login, children }) {
  const [chats, setChats] = useLocalStorage('chats', [])
  const [selectedChat, setSelectedChat] = useState(0)
  const { contacts } = useContacts();
  const socket = useSocket();

  function createChat(receivers) {
    setChats(prevChats => {
      return [...prevChats, { receivers, messages: [] }]
    })
  }

  function equalArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false
    arr1.sort()
    arr2.sort()
    return arr1.every((element, index) => {
      return element === arr2[index]
    })
  }
//will be called 1) from server when we receive a message 2) when we send a msg
  const addMessageToChat = useCallback (({ receivers, message, sender }) => {
    setChats(prevChats => {
      let hasChanged = false
      const newMessage = { sender, message }
      const newChats = prevChats.map(chat => {
        if (equalArrays(chat.receivers, receivers)) {
          hasChanged = true
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          }
        }
        return chat
      })

      if (hasChanged) {
        return newChats
      } else {
        return [
          ...prevChats,
          { receivers, messages: [newMessage] }
        ]
      }
    })
  },[setChats] )
  
  useEffect(() => {
    if (socket == null) return 
    socket.on('receive-message', addMessageToChat)

    return () => {
      socket.off('receive-message')
    }
  }, [socket, addMessageToChat])

  function sendMessage(receivers, message) {
    socket.emit('send-message',{receivers, message})
    addMessageToChat({ receivers, message, sender: login })
  }

  const formattedChats = chats.map((chat, index) => {
    const receivers = chat.receivers.map(receiver => {
      const contact = contacts.find(contact => {
        return contact.login === receiver
      })
      const name = (contact && contact.name) || receiver
      return { login: receiver, name }
    })

    const messages = chat.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.login === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = login === message.sender
      return { ...message, senderName: name, fromMe }
    })
    
    const selected = index === selectedChat
    return { ...chat, messages, receivers, selected }
  })

  const value = {
    chats: formattedChats,
    selectedChat: formattedChats[selectedChat],
    sendMessage,
    selectChat: setSelectedChat,
    createChat
  }

  return (
    <ChatsContext.Provider value={value}>
      {children}
    </ChatsContext.Provider>
  )
}


/*
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

  function equalArrays(arr1, arr2) {
    if (arr1.length!==arr2.length) return false
    arr1.sort();
    arr2.sort();
    return arr1.every((el, index) => {
      return el === arr2[index]
    })
  }

  function addMessageToChat({receivers, message, sender}) {
    setChats(prevChats => {
      const newMessage = {sender, message}
      const newChats = prevChats.map(chat => {
        if (equalArrays(chat.receivers,receivers)) {
          hasChanged = true
          return {...chats, messages:[...chats.messages, newMessage]}
        }
        return chat

      })
      let hasChanged = false;
      if (hasChanged) {
        return newChats
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

  const messages = chat.messages.map(message => {
    const contact = contacts.find(contact => {
      return contact.login === message.sender
    })
    const name = (contact && contact.name) || message.sender
    const isFromMe = login === message.sender
    return { ...message, senderName: name, isFromMe }
  })

  const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }

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

*/
