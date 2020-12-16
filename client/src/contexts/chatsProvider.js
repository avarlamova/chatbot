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

  function createChat(recipients) {
    setChats(prevChats => {
      return [...prevChats, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, message, sender }) => {
    setChats(prevChats => {
      let madeChange = false
      const newMessage = { sender, message }
      const newConversations = prevChats.map(chat => {
        if (arrayEquality(chat.recipients, recipients)) {
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
          ...prevChats,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setChats])

  useEffect(() => {
    if (socket == null) return
    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, message) {
    socket.emit('send-message', { recipients, message })
    addMessageToConversation({ recipients, message, sender: login })
  }

  const formattedConversations = chats.map((chat, index) => {
    const recipients = chat.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.login === recipient
      })
      const name = (contact && contact.name) || recipient
      return { login: recipient, name }
    })

    const messages = chat.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.login === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = login === message.sender
      return { ...message, senderName: name, fromMe }
    })
    
    const selected = index === selectedConversationIndex
    return { ...chat, messages, recipients, selected }
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
