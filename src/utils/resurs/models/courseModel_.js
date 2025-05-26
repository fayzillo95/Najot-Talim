import { model, Schema } from "mongoose";


export default model("Course", new Schema({
    branch_id:{
        type:Schema.Types.ObjectId,
        ref:"Branch"
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name: {
        type:String
    }
}))