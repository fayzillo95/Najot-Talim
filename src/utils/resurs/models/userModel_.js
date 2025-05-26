import { model, Schema } from "mongoose";


export default model("User", new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    role:{
        type:String,
        enum : ["user","teacher", "moderator", "admin" ,"supperadmin"],
        default :"user"
    },
    email: {
        type: String,
        unique : true
    },
    password: {
        type: String
    },
    birth_day: {
      type:String  
    },
    profile_img :{
        type:String
    }    
}))


