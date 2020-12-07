const io = require ('socket.io') (5000)

io.on('connection', socket => {
    const login = socket.handshake.query.login;
    socket.join(login)

    socket.on('send-message', ({receivers, message}) => {
        receivers.forEach(receiver => {
            const newReceivers = receivers.filter(r => r!==receiver)
            newReceivers.push(login)
            socket.broadcast.to(receiver).emit('receive-message', {
                receivers: newReceivers,
                sender: login, 
                message
            })
        });
    })
})