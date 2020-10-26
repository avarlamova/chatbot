import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'



export default function NewChat() {


    return (  
        <>
    <Modal>
        <Modal.Header>
            New chat
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label> Add name </Form.Label>
            </Form>
        </Modal.Body>
    </Modal>
    </>
    )
}
