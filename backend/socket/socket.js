import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
})

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log('✅ User Connected: ', socket.id)

    const userId = socket.handshake.query.userId
    // strip off anything after ? just in case
    const cleanUserId = userId?.split("?")[0];
    if (cleanUserId) {
        userSocketMap[cleanUserId] = socket.id
    }

    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`User ${cleanUserId} joined conversation ${conversationId}`);
    })

    socket.on('leaveConversation', (conversationId) => {
        socket.leave(conversationId);
        console.log(`User ${cleanUserId} left conversation ${conversationId}`);
    })

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on('sendMessages', ({senderId, recieverId, text ,conversationId }) => {
        console.log("📨 Received message request:", { conversationId, senderId, recieverId, message });

        

        console.log("Reciever Socket ID: ", recieverSocketId)
        const message = {
            _id: new Date().getTime().toString(),// temp Unique id of message
            conversationId,//simple conversatin Id
            senderId,
            recieverId,
            message:text,

        }

        io.to(conversationId).emit('newMessage', message);
        console.log("📤 Broadcasted to conversation:", conversationId, message);


        const recieverSocketId = userSocketMap[recieverId]
        //*sending to reciever if they are online 
        if (recieverSocketId) {
            io.to(recieverSocketId).emit('notification', message
            );
            console.log("🔔 Sent notification to: ", recieverId);
        }

        //*sending to Sender if they are online 
        io.to(userSocketMap[senderId]).emit('newMessage', message);
        console.log("📤 Sent back to sender:", senderId, message);
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected: ', socket.id)
        delete userSocketMap[cleanUserId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})




export { app, io, server }
