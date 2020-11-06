import React, { useState } from 'react';
import Contacts from './contacts';
import Chats from './chats';
import {Tab, Nav, Modal, Button} from 'react-bootstrap';
import NewChat from './newchat';
import NewContact from './newcontact'

export default function Screen ({login}) {
        const [activeTab, setActiveTab] = useState('contacts');
        const chatIsOpen = activeTab === 'chats';
        const [modalOpen, setModalOpen] = useState(false);

        function closeModal () {
        setModalOpen(false)
        }

        function openModal () {
        setModalOpen(true)
        }

        return (
        <div> 
            {login}
            <Tab.Container> 
                <Nav variant="tabs"> 
                <Nav.Item> 
                        <Nav.Link eventKey="contacts">
                          Contacts
                        </Nav.Link>
                </Nav.Item>
                <Nav.Item> 
                        <Nav.Link eventKey="chats">
                          Chats
                        </Nav.Link>
                </Nav.Item>
                </Nav>
                <Tab.Content> 
                        <Tab.Pane eventKey="contacts">
                         <Contacts /> 
                        </Tab.Pane>
                        <Tab.Pane eventKey="chats">
                                <Chats /> 
                        </Tab.Pane>
                </Tab.Content>

                <Button onClick={()=> setModalOpen(true)}>
                        New contact
                </Button>
            </Tab.Container>

            <Modal show = {modalOpen}>
                    {chatIsOpen ?   
                    <NewChat close = {closeModal}/>  :
                    <NewContact close = {closeModal} /> 
                    }
            </Modal>
        </div>
        )
    
}
