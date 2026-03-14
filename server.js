import dotenv from "dotenv"
import connectToDB from "./src/config/database.js";
import app from "./src/app.js";
import { testAi } from "./src/services/ai.service.js";

dotenv.config()

connectToDB()
.catch((err)=>{
    console.error("MongoDB connection failed:", err)
    process.exit(1)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res)=>{
    console.log("Server is running on 3000");  
})