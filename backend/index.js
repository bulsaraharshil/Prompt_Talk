const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const {generateMessage, generateLocationMessage} = require('./utils/messages');
const {addUser, removeUser, getUser, get_users, getUsersInRoom} = require('./utils/users');

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, 'src');

app.use(express.static(publicDirectoryPath)); //To use the components of Public Directory

io.on('connection', (socket) => {
    //console.log("New WebSocket Connection");

    socket.on('join', ({userName, room}, callback) => {
        //console.log("ENtered in Connection",userName,room);
        const{ error, user} = addUser({id: socket.id, userName, room});
        //console.log("CHATT:",user);
        if (error) {
            return callback(error);
        }

        socket.join(user.room);
        
        socket.emit('message',generateMessage("Welcome!","Admin"));
        socket.broadcast.to(user.room).emit('message',generateMessage(`${user.userName} has joined!`,"Admin"));
        io.to(user.room).emit('roomData',{
            room:user.room,
            users: getUsersInRoom(user.room)
        });
        //  callback();
    });


    socket.on('chatMessage', (message, callback) => {
        //console.log("Inside chatMessage");
        const user = getUser(socket.id);
        //console.log("Inside chatMessage ::", user);
        // const filter = new Filter();
        // if(filter.isProfane(message)){
        //     return callback('Profanity is not allowed!');
        // }
        io.to(user.room).emit('message',message);
        // callback();
    });

    // socket.on('sendLocation',(coords, callback) => {
    //     const user = getUser(socket.id);
    //     io.to(user.room).emit('locationMessage', generateLocationMessage(user.userName, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
    //     callback();
    // });
    socket.on('disconnect', ()=> {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', generateMessage(` ${user.userName} has left`,"Admin"));
            io.to(user.room).emit('roomData',{
                room:user.room,
                users: getUsersInRoom(user.room)
            });
        }

    });
});

app.get('/users', (req, res) => {
    res.send({users: get_users()});
})

server.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
});



