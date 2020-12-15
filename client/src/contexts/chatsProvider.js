import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/localstorage';
import { useContacts } from './contactsProvider';
import { useSocket } from './socketProvider';

const ChatsContext = React.createContext()

export function useChats() {
  return useContext(ChatsContext)
}

export function ChatsProvider({ login, children }) {
  const [chats, setChats] = useLocalStorage('chats', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket()

  function createChat(receivers) {
    setChats(prevConversations => {
      return [...prevConversations, { receivers, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ receivers, text, sender }) => {
    setChats(prevConversations => {
      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConversations.map(chat => {
        if (arrayEquality(chat.receivers, receivers)) {
          madeChange = true
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          }
        }

        return chat
      })

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          { receivers, messages: [newMessage] }
        ]
      }
    })
  }, [setChats])

  useEffect(() => {
    if (socket == null) return
    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(receivers, text) {
    socket.emit('send-message', { receivers, text })
    addMessageToConversation({ receivers, text, sender: id })
  }

  const formattedConversations = chats.map((chat, index) => {
    const receivers = chat.receivers.map(receiver => {
      const contact = contacts.find(contact => {
        return contact.id === receiver
      })
      const name = (contact && contact.name) || receiver
      return { id: receiver, name }
    })

    const messages = chat.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })
    
    const selected = index === selectedConversationIndex
    return { ...chat, messages, receivers, selected }
  })

  const value = {
    chats: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createChat
  }

  return (
    <ChatsContext.Provider value={value}>
      {children}
    </ChatsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}
