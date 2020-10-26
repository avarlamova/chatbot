import React, { useState } from 'react';
import Contacts from './contacts';
import Chats from './chats';
import {Tab, Nav} from 'react-bootstrap';

export default function Screen ({login}) {
        const [activeTab, setActiveTab] = useState('contacts')
        return (
               /* tab container? */
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
        </div>
        )
    
}
