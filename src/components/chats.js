import React from 'react'
import { useContacts } from '../contexts/contactsProvider';
import { useChats } from '../contexts/chatsProvider';

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
