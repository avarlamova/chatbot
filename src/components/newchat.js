import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function Newchat() {

  const [hide, setHide] = useState(false);

  const handleHide = () => setHide(true);

    return (  
        <>
    <Modal hide = {hide}>
        <Modal.Header>
            Header
        </Modal.Header>
        <Modal.Title>
            Chat
        </Modal.Title>

        <Modal.Body>
            Some chats 
        </Modal.Body>
    </Modal>

    <button onClick= {handleHide} className="btn btn-info">
        Close
    </button>
    </>
    )
}
