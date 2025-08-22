import chalk from "chalk"
import Conversation from "../models/conversation.model.js"
import Message from "../models/messages.model.js"
import { uploadResultonCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose"
import User from "../models/user.model.js"


const sendMessages = async (req, res) => {
    // console.log(chalk.blueBright('Message sent by: ', req.params.id))

    try {

        //? (lets make this supprot media) const {message} = req.body;
        const  receiverId  = req.params.id;
        const senderId  = req.user._id;

       

       

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        let messageText = req.body.message || "";
        let mediaUrls = [];
        let type = 'text'

        //*handling File Uploads if Presend 
        if (req.files && req.files.length > 0) {
             mediaUrls = await Promise.all(
                req.files.map(file => uploadResultonCloudinary(file.path))
            );

            //*Detect Type from first file Mimetype
            const firstMime = req.files[0].mimetype;
            if (firstMime.startsWith('image/')) type = 'image'
            else if (firstMime.startsWith('video/')) type = 'video'
            else if (firstMime.startsWith('audio/')) type = 'audio'
            else type = 'file'
        }

        const newMessages = new Message({
            conversationId: conversation._id,
            senderId,
            receiverId,
            message: messageText || undefined,
            type,
            mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
           
        })

        if (newMessages) {
            conversation.messages.push(newMessages._id)
        }

        conversation.lastMessage = newMessages._id
        await Promise.all([conversation.save(),newMessages.save()]);


        // await conversation.save();
        // await newMessages.save();
        


        // console.log("Message sent By ",newMessages.message)

        const sender = await User.findById(senderId).select('fullname')
        const reciever = await User.findById(receiverId).select('fullname')
        console.log(`Message: ${newMessages.message} sent by ${sender.fullname} to ${reciever.fullname} `)

        //! SOCKET IO FUNCTIONLITY TO MAKE IT REAL TIME

        return res.status(200).json(newMessages)
    } catch (error) {
        console.log('Error sending message: ', error)
        res.status(500).json({ message: 'Error sending message,Internal Server Error' })

    }
}

const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const  conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId],}}).populate('messages')
        
        if(!conversation) return res.status(404).json({ message: 'Conversation Not Found' })
        
        const messages = conversation.messages   

        console.log("Message Recieved was: ",messages)

        res.status(200).json(messages)
    } catch (error) {
        console.log('Error in getMessages of message.controller: ', error)
        res.status(500).json({ message: 'Error Getting message,Internal Server Error in getMessages of message.controller' })
    }
}
export { sendMessages , getMessages }