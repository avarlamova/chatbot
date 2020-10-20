import React, {useState} from 'react';


export default function Contacts( {login} ) {

    const [activeContact, setActiveContact] = useState('Mary');

    return (
        <nav className = "nav nav-tabs" activekey = {activeContact} onSelect= {setActiveContact}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="#">Contacts</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" eventkey = "Jack" href="#">Jack</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" eventkey = "Mary" href="#">Mary</a>
                </li>
            </ul>            
        </nav>
    )
}
/* add new contact button'*/
