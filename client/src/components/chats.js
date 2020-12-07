import React from 'react'
import { useChats } from '../contexts/chatsProvider';
import { ListGroup } from 'react-bootstrap'

export default function Chats() {
  const { chats, selectChat } = useChats()

  return (
    <ListGroup variant="flush">
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


/*

export default function Chats() {
  const { chats } = useChats();
   
  return (
    <>
    <nav className = "nav flex-column" >
   <ul className="list-group">
            {chats.map((chat) => (
            <li className="list-group-item">
                 <a className="nav-link"  href="#" >{chats.receivers.map(receiver => receiver.name).join(', ')}</a>
             </li>
            ))}
    </ul>            
    </nav>

    </>
)
}
*/
