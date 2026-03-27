import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle, generateResponse } from "../services/ai.service.js"

export async function sendMessage(req, res) {


    let { message, chat: chatId } = req.body;
    let title = null, chat = null;

    if (!chatId) {

        title = await generateChatTitle(message)
        chat = await chatModel.create({
            user: req.user.id,
            title: title
        })
    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({ chat: chatId || chat._id })
    const result = await generateResponse(messages)

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })


    res.status(201).json({
        title: title,
        chat,
        aiMessage
    })

}

export async function getChats(req, res) {

    const user = req.user;
    
    const chats = await chatModel.find({user: user.id})
    
    res.status(200).json({
        message: "Chats retrieved sucessfully!",
        chats: chats
    })
}

export async function getMessages(req, res) {
    const { chatId } = req.params

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            messages: "Chat not found",
            success: false,
            err: `Chat does not exists with id ${chatId}`
        })
    }

    const messages = await messageModel.find({ chat: chatId })

    res.status(200).json({
        message: "Messages retrived sucessfully!",
        messages
    })
}

export async function deleteChat(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
        chat: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found",

        })
    }

    res.status(200).json({
        message: "Chat deleted sucessfully"
    })
}