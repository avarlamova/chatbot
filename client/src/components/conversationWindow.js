import React, { useState, useCallback} from 'react'
import {useChats} from '../contexts/chatsProvider'
import { Form, InputGroup, Button } from 'react-bootstrap'


export default function ConversationWindow() {

    const [message, setMessage] = useState('message');
    const {sendMessage, selectedChat} = useChats();
    const setRef = useCallback(node => {
        if (node) {
          node.scrollIntoView({ smooth: true })
        }
      }, [])

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
          {selectedChat ? selectedChat.messages.map((msg, index) => {
            const lastMessage = selectedChat.messages.length - 1 === index
            return (
              <div key={index}
              ref={lastMessage ? setRef : null}>
                <div>
                  {msg.message}
                </div>
                <div className={msg.fromMe ? 'text-right' : ''}>
                  {msg.fromMe ? 'You' : msg.senderName}
                </div>
              </div>
            )
          }) : ''}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={message}
              onChange={handleChange}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
</div>
    )
}

