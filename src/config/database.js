import mongoose from "mongoose"

async function connectToDB(){
    await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("database is connected");  
        })
        .catch((e)=>{
            console.log(e);
            
        })
}

export default connectToDB