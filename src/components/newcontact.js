import React, {useRef} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import  {ContactsProvider}  from '../contexts/contactsProvider'


export default function NewContact() {

    const nameRef = useRef()
    const logRef = useRef()
    const { createContact } = ContactsProvider(' ') 

    

    function submitForm () {
        createContact(logRef.current.value, nameRef.current.value)
    }

    return (
        <>
            <Modal.Header>
                New contact
                <Button className="btn-secondary">
                    Close
                </Button>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit = {submitForm}>
                <Form.Group>
                    <Form.Label> Login </Form.Label>
                    <Form.Control type="text" ref={logRef} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label> Name </Form.Label>
                    <Form.Control type="text" ref={nameRef} required>
                    </Form.Control>
                </Form.Group>
            <Button type="submit"> Add new contact </Button>
            </Form>
        </Modal.Body>
        </>
    )
}
