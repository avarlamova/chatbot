import React, { useState} from 'react';
import { useContacts } from '../contexts/contactsProvider';


export default function Contacts( {login} ) {

    const {contacts} = useContacts()
    const [activeContact, setActiveContact] = useState('Jack');

    return (
    <>
       <nav className = "nav flex-column" activekey = {activeContact} onSelect= {setActiveContact}>
       <ul className="list-group">
                {contacts.map(contact => (
                <li key = {contact.login} className="list-group-item">
                     <a className="nav-link"  href="#" >{contact.name}</a>
                 </li>
                ))}
        </ul>            
        </nav>
    </>
    )
    }
