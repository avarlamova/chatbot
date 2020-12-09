import React from 'react'
import { useChats } from '../contexts/chatsProvider';
import { ListGroup } from 'react-bootstrap'

export default function Chats() {
  const { chats, selectChat } = useChats()

  return (
    <ListGroup>
      {chats.map((chat, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectChat(index)}
          active={chat.selected}
        >
          {chat.receivers.map(r => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

