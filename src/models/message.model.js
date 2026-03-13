import mongoose from "mongoose"

const messageSchema = new Schema({
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Chat,
        required: true
    },

    content:{
        type: String,
        required: true
    },

    role:{
        type: String,
        emun: [ai, user],
        required: true
    }
}, {timestamps: true})

const messageModel = mongoose.model("Message", messageSchema)

export default messageModel