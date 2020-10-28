import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'



export default function NewChat({closeModal}) {


    return (  
        <>
        <Modal.Header>
            New chat
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label> Add name </Form.Label>
            </Form>
        </Modal.Body>
    </>
    )
}
