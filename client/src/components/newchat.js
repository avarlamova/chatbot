import React, { useState } from 'react'
import {useContacts} from '../contexts/contactsProvider'
import {useChats} from '../contexts/chatsProvider'
import { Modal, Form, Button } from 'react-bootstrap'
 

export default function NewChat({closeModal}) {

  const [selectedContactIds, setSelectedContactIds] = useState([])
  const { contacts } = useContacts()
  const { createChat } = useChats()

  function handleSubmit(e) {
    e.preventDefault()
    createChat(selectedContactIds)
    closeModal()
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create chat</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.login} key={contact.login}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.login)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.login)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
