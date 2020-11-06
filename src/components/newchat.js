import React, { useState, useContext } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import {useContacts} from '../contexts/contactsProvider'
 

export default function NewChat({closeModal}) {

    const {contacts} = localStorage.getItem('contacts')

    return (  
        <>
        <Modal.Header>
                New chat
                <Button className="btn-secondary">
                    Close
                </Button>
            </Modal.Header>
            <Modal.Body>
                {contacts.map (contact => (
                    <Form.Group controlId={contact.login} key={contact.login}>
                        <Form.Check type="checkbox" label={contact.name} value={false}>

                        </Form.Check>
                    </Form.Group>
                ))}
            <Button type="submit"> Add new contact </Button>
        </Modal.Body>
    </>
    )
}
