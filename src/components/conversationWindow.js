import React, {useState} from 'react'
import {useChats} from '../contexts/chatsProvider'

export default function ConversationWindow() {

    const [message, setMessage] = useState('message');
    const {sendMessage, selectedChat} = useChats();


    function handleChange(e) {
        e.preventDefault();
        setMessage(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(selectedChat.receivers.map(receiver => receiver.login), message);
        setMessage('');
    }

    return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end">
          {selectedChat.messages.map((msg, index) => {
            const lastMessage = selectedChat.messages.length - 1 === index
            return (
              <div key={index}>
                <div>
                  {msg.message}
                </div>
                <div className={msg.fromMe ? 'text-right' : ''}>
                  {msg.fromMe ? 'You' : msg.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>

            <form onSubmit={handleSubmit}> 
                <div className="form-group">
                    <input onChange={handleChange} type="textarea" className="form-control" required value={message} />
                <button  type="submit" className="btn btn-info">
                Send message
                </button>
                </div>
            </form>
        </div>
    )
}

