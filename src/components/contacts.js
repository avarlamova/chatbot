import React, {useContext, useState} from 'react';
import { useContacts } from '../contexts/contactsProvider';


export default function Contacts( {login} ) {

    const contacts = localStorage.getItem('contacts').split(',');
    const [activeContact, setActiveContact] = useState('Jack');

    return (
    <>
       <nav className = "nav nav-tabs" activeKey = {activeContact} onSelect= {setActiveContact}>
            <ul class="nav flex-column">
                {contacts.map(contact => (
                <li class="nav-item">
                     <a class="nav-link" href="#">{contact}</a>
                 </li>
                ))}
                <li class="nav-item">
                    <a class="nav-link" eventKey = "Jack" href="#">Jack</a>
                </li>
            </ul>            
        </nav>
    </>
    )
    }
