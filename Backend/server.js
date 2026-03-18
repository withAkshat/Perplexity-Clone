import dotenv from "dotenv"
dotenv.config()
import connectToDB from "./src/config/database.js";
import app from "./src/app.js";
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer = http.createServer(app);
initSocket(httpServer);

connectToDB()
.catch((err)=>{
    console.error("MongoDB connection failed:", err)
    process.exit(1)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res)=>{
    console.log("Server is running on 3000");  
})