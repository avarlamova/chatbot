import React from 'react'
import { useChats } from '../contexts/chatsProvider';
import { ListGroup } from 'react-bootstrap'

export default function Conversations() {
  const { chats, selectConversationIndex } = useChats()

  return (
    <ListGroup variant="flush">
      {chats.map((chat, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={chat.selected}
        >
          {chat.receivers.map(r => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

