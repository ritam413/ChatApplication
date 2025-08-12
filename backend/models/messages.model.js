import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    conversationId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Conversation',
      required: true  
    },
    type: {
        type: String,
        enum:['text', 'image', 'video', 'audio', 'file'],
        default: 'text'
    },
    message: {
        type: String,
        required: function(){
            return this.type === 'text'
        }
    },
    mediaUrls: [{
        type: String,
        required: function(){
            return this.type !== 'text'
        }
    }],
    isRead: {
        type: Boolean,
        default: false
    },
    readAt:{
        type: Date
    },
    isDeletedForEveryone:{
        type: Boolean,
        default: false
    },
    deletedFor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{timestamps:true})

const Message = mongoose.model('Message', messageSchema)

export default Message