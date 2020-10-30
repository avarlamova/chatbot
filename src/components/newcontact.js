import React, {useRef} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import useLocalStorage from '../hooks/localstorage'


export default function NewContact() {

    const nameRef = useRef();
    const logRef = useRef();
    const [contacts, setContacts] = useLocalStorage('contacts', [])

    function createContact (login, name) {
        setContacts(prevContacts =>  {
            return [...prevContacts, {login, name}]
        })
    }

    function submitForm () {
        createContact(logRef.current.value, nameRef.current.value)
        //closeWindow();
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
