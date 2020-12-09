import React, { useState } from 'react'
import {useContacts} from '../contexts/contactsProvider'
import {useChats} from '../contexts/chatsProvider'
import { Modal, Form, Button } from 'react-bootstrap'
 

export default function NewChat({closeModal}) {

    const {contacts} = useContacts();
    const [selectedContacts, setSelectedContacts] = useState([]);
    const {createChat} = useChats();


    function handleSubmit (e) {
        e.preventDefault();
        createChat (selectedContacts);
        closeModal();
    }

    function handleChange (login) {
        setSelectedContacts(prevSelectedContacts => {
            if (prevSelectedContacts.includes(login)) {
              return prevSelectedContacts.filter(prevLogin => {
                return login !== prevLogin
              })
            } else {
              return [...prevSelectedContacts, login]
            }
          })
    }

    return (  
        <>
        <Modal.Header>
                New chat
                <Button className="btn-secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                {contacts.map (contact => (
                    <Form.Group controlId={contact.login} key={contact.login}>
                        <Form.Check 
                        type="checkbox" 
                        label={contact.name} 
                        value={selectedContacts.includes(contact.login)}
                        onChange = {handleChange}>
                        </Form.Check>
                    </Form.Group>
                ))}
                <Button type="submit"> Start the conversation </Button>
                </Form>
        </Modal.Body>
    </>
    )
}
