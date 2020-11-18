import React, {useState} from 'react'
import { useChats } from '../contexts/chatsProvider';
import { useContacts } from '../contexts/contactsProvider';


export default function Chats() {

    const {chats} = useChats();
    const {contacts} = useContacts();
    const [activeChat, setActiveChat] = useState('Jack');

    return (
        <>
        <nav className = "nav flex-column" activekey =  {activeChat} onSelect= {setActiveChat}>
       <ul className="list-group">
                {сhats.map(chat,index => (
                <li key = {index} className="list-group-item">
                     <a className="nav-link"  href="#" >{chat.receivers.map(receiver => receiver.name).join(', ')}</a>
                 </li>
                ))}
        </ul>            
        </nav>

        <div className="modal" role="dialog">
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className="modal-body">
            <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-primary">Save changes</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}

