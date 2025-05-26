import mongoose from "mongoose";

export const dbCon = async () =>{
    const uri = process.env.MONGO_URI
    console.log(uri)
    try {
        await mongoose.connect(uri)
        console.log("Mongo db connect !")
    } catch (error) {
        console.log(error.message)        
    }
}