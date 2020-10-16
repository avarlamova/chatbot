import React, {useState} from 'react'

export default function Contacts( {login} ) {

    const [activeContact, setActiveContact] = useState('Mary');

    return (
        <nav className = "nav nav-tabs" activeKey = {activeContact}>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="#">Contacts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" eventKey = "Jack" href="#">Jack</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" eventKey = "Mary" href="#">Mary</a>
                </li>
            </ul>            
        </nav>
    )
}
