import dotenv from "dotenv"
dotenv.config()
import connectToDB from "./src/config/database.js";
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 8000

const httpServer = http.createServer(app);
initSocket(httpServer);

connectToDB()
.catch((err)=>{
    console.error("MongoDB connection failed:", err)
    process.exit(1)
})


httpServer.listen(PORT, (req, res)=>{
    console.log("Server is running on "+ PORT);  
})