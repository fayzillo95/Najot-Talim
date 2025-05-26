import { model, Schema } from "mongoose";


export default model("Student_course", new Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        ref:"User"
    },
    course_id : {
        type : Schema.Types.ObjectId,
        ref : "Course"
    }
}));