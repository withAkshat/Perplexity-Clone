import mongoose from "mongoose"

async function connectToDB(){
    const conn =  await mongoose.connect(process.env.MONGO_URI)
    console.log("Database is connected!")
}

export default connectToDB