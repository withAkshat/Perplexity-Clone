import { initializeSocketConnection } from "../services/chat.socket.js";

export function useChat(){
    
    return {
        initializeSocketConnection,
    }
}