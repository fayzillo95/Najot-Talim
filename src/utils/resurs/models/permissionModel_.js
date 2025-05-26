import { model, Schema } from "mongoose";



export default model("Permission", new Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        ref:"User"
    },
    branch_id :{
        type : Schema.Types.ObjectId,
        ref : "Branch"
    },
    actions : {
        type :[String],
        enum : ["POST","GET","PUT","PATCH", "DELETE"]
    },
    model : {
        type :String,
        enum : ["Course","Student_course"]
    } 
}))