import React, { useState } from 'react';
import Contacts from './contacts';
import Chats from './chats';
import {Tab, Nav, Modal, Button} from 'react-bootstrap';
import NewChat from './newchat';
import NewContact from './newcontact'

export default function Sidebar ({login}) {
        const [activeTab, setActiveTab] = useState('contacts');
        const chatIsOpen = activeTab === 'chats';
        const [modalOpen, setModalOpen] = useState(false);

        function closeModal () {
        setModalOpen(false)
        }

        return (
        <div> 
            {login}
            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>  
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
                New {chatIsOpen ? 'chat' : 'contact'}
                </Button>
            </Tab.Container>
            
            <Modal show = {modalOpen} onHide = {closeModal}>
                    {chatIsOpen ?   
                    <NewChat closeModal = {closeModal}/>  :
                    <NewContact closeModal = {closeModal} /> 
                    }
            </Modal>

        </div>
        )
    
}
