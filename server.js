import dotenv from "dotenv"
import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

dotenv.config()

connectToDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res)=>{
    console.log("Server is running on 3000");  
})