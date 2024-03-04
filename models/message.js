import mongoose from "mongoose"
import { Schema } from "mongoose"

const messageSchema = new Schema({
    messages: Object,
    userID: String
}, { timestamps: true})

const Message = mongoose.model('Message', messageSchema)

export default Message