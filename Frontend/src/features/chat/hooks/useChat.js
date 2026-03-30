import { initializeSocketConnection } from "../services/chat.socket.js";
import { sendMessage, deleteChat, getChats, getMessages } from "../services/chat.api.js";
import { useDispatch } from "react-redux"
import { setChats, setLoading, setError, setCurrentChatId, addMessages, addNewMessages, createNewChat } from "../chat.slice.js";


export function useChat() {

    const dispatch = useDispatch()

    const handleSendMessage = async ({ message, chatId }) => {

        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })
        const { aiMessage, chat } = data
       dispatch(createNewChat({
        chatId: chat._id || chatId,
        title: chat.title
       }))
       dispatch(addNewMessage({
        chatId: chat._id || chatId,
        content: message,
        role: "user"
       }))
       dispatch(addNewMessage({
        chatId: chat._id|| chatId,
        content: aiMessage.content,
        role:  aiMessage.role
       }))
       dispatch(setCurrentChatId(chat._id))
    }

    async function handleGetChats(){
        
        dispatch(setLoading(true))
        const data = await getChats()        
        console.log(data);
        const { chats } = data
        dispatch(setChats( chats.reduce((acc, chat)=>{
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages:[],
                lastUpdated: chat.updatedAt
            }
            
            return acc

        }, {}) ))
        dispatch(setLoading(false))
    }

     async function handleOpenChat(chatId, chats) {

        if (chats[ chatId ]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}