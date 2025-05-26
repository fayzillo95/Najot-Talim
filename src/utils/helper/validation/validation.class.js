import Joi from "joi"

function isDate(value, helpers){
    const date = new Date(value)
    if(isNaN(date.getTime())){
        return helpers.message("Invalid birthday !")
    }
    return value
}

export default class Validations{
    constructor(){}

    static regiterValid(payload) {
        const regiterSchema = Joi.object({
            first_name :Joi.string().pattern(/^[A-Za-z]{3,32}$/).required(),
            last_name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().min(8).max(32).required(),
            r_password:Joi.ref("password"),
            birth_day:Joi.string().date().required(),
        })
        return regiterSchema.validate(payload,{
            abortEarly:false,
            allowUnknown:false
        })
    }
    static loginValid(payload) {
        const loginSchema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().min(8).max(32).required()
        })
        return loginSchema.validate(payload,{
            abortEarly:false,
            allowUnknown:false
        })
    }
    static permissionValid(payload){
        const permissionSchema = Joi.object({
            user_id:Joi.string().length(24).required(),
            branch_id:Joi.string().length(24).required(),
            actions:Joi.string().valid("POST","GET","PUT","PATCH", "DELETE").required(),
            model:Joi.string().valid("Course","Student_course")
        })
        return permissionSchema.validate(payload,{
            abortEarly:false,
            allowUnknown:false
        })
    }
    static async courseValid(payload){
        const courseSchema = Joi.object({
            branch_id:Joi.string().length(24).required(),
            user_id:Joi.string().length(24).required(),
            name:Joi.string().required()
        })
        return courseSchema.validate(payload, {
            abortEarly:false,
            allowUnknown:false
        })
    }

    static studentCoursesValid(payload) {
        const Student_courseSchema = Joi.object({
            user_id:Joi.string().length(24).required(),
            course_id:Joi.string().length(24).required(),
        })
        return Student_courseSchema.validate(payload,{
            abortEarly:false,
            allowUnknown:false
        })        
    }

}