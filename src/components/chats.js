import React, {useState} from 'react'

export default function Chats() {

    const [activeChat, setActiveChat] = useState('Jack');

    return (
        <>
        <nav className = "nav nav-tabs" activekey = {activeChat} onSelect= {setActiveChat}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="#">Conversations</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" eventkey = "Jack" href="#">Jack</a>
                </li>
            </ul>            
        </nav>

        </>
    )
}

/* add new chat button'*/
