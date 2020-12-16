import React from 'react';
import { useContacts } from '../contexts/contactsProvider';
import { ListGroup } from 'react-bootstrap'



export default function Contacts() {

    const {contacts} = useContacts()
    
    return (
        <ListGroup >
          {contacts.map(contact => (
            <ListGroup.Item  key={contact.login}
            >
              {contact.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )
    }
