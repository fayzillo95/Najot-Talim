import { model, Schema } from "mongoose";


export default model("City", new Schema({
    name:{type:String}
}))