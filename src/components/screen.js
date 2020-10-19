import React, { Component } from 'react';
import Contacts from './contacts';
import Chats from './chats';

export default function Screen ({login}) {

        return (
               /* tab container? */
            <>
            <Contacts login = {login} />
            <Chats />
            </>
        )
    
}
