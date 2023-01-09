import React, { useState, useCallback } from "react";
import { useChats } from "../contexts/chatsProvider";
import { Form, InputGroup, Button } from "react-bootstrap";

export default function ConversationWindow() {
  const [message, setMessage] = useState("");
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useChats();

  function handleSubmit(e) {
    e.preventDefault();
    const timeStamp = +new Date();
    sendMessage(
      selectedConversation.recipients.map((r) => r.login),
      message,
      timeStamp
    );
    setMessage("");
  }

  function dateIsValid(date) {
    return date instanceof Date && !isNaN(date);
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation
            ? selectedConversation.messages.map((msg, index) => {
                const lastMessage =
                  selectedConversation.messages.length - 1 === index;
                return (
                  <div
                    ref={lastMessage ? setRef : null}
                    key={index}
                    className={`my-1 d-flex flex-column ${
                      msg.fromMe
                        ? "align-self-end align-items-end"
                        : "align-items-start"
                    }`}
                  >
                    <div
                      className={`rounded text-right px-2 py-1 ${
                        msg.fromMe ? "bg-primary text-white" : "border"
                      }`}
                    >
                      {msg.message}
                      <div style={{ fontSize: "0.5 rem" }}>
                        {dateIsValid(new Date(msg.timeStamp))
                          ? new Date(msg.timeStamp).toLocaleTimeString()
                          : ""}
                      </div>
                    </div>
                    <div
                      className={`text-muted small ${
                        msg.fromMe ? "text-right" : ""
                      }`}
                    >
                      {msg.fromMe ? "You" : msg.senderName}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
