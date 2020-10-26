import React, { useState } from 'react';
import Contacts from './contacts';
import Chats from './chats';
import {Tab, Nav, Modal} from 'react-bootstrap';
import NewChat from './newchat';
import NewContact from './newcontact'

export default function Screen ({login}) {
        const [activeTab, setActiveTab] = useState('contacts');
        const chatIsOpen = activeTab === 'chats';
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
            </Tab.Container>

            <Modal>
                    {chatIsOpen} ? 
                    <NewChat/>
                    <NewContact />
            </Modal>
        </div>
        )
    
}
