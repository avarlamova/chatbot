const io = require("socket.io")(3001);

io.on("connection", (socket) => {
  const login = socket.handshake.query.login;
  socket.join(login);

  socket.on("send-message", ({ recipients, message }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(login);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: login,
        message,
      });
    });
  });
});
