import React, {useState} from 'react';
import useLocalStorage from '../hooks/localstorage';


export default function Contacts( {login} ) {

    const contacts = localStorage.getItem('contacts')
    const [activeContact, setActiveContact] = useState('Mary');

    return (
        <>
        <nav className = "nav nav-tabs" activeKey = {activeContact} onSelect= {setActiveContact}>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="#">Contacts</a>
                </li>
                {contacts}
            </ul>            
        </nav>
        </>
    )
}
/* add new contact button'*/
