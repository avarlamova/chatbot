import React, {useState} from 'react'


export default function Chats() {

    const [activeChat, setActiveChat] = useState('Jack');

    return (
        <>
        <nav className = "nav nav-tabs" activeKey = {activeChat} onSelect= {setActiveChat}>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="#">Conversations</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" eventKey = "Jack" href="#">Jack</a>
                </li>
            </ul>            
        </nav>

        <button> New chat </button>

        <div class="modal" role="dialog">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}

