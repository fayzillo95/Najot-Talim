import { Schema, model } from "mongoose";

export default model("Brach", new Schema({
    name:{type:String},
    adress:{
        type:Schema.Types.ObjectId,
        ref:"City"
    }
}))
