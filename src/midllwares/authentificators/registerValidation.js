import ValidationError from "../../utils/helper/errors/ValidationError.js"
import Validations from "../../utils/helper/validation/validation.class.js"

export const registerValidation = (req, res, next) => {
    try {
        if(!req.body || Object.values(req.body).length === 0) throw new ValidationError(400,"Invalid body epty object !")
        if(!req.files) throw new ValidationError(400,"Invalid data empty files !")
        console.log(req.files)
        const {error} = Validations.regiterValid(req.body)
        if(error){
            throw new ValidationError(401,error.details.join(" | "))
        }
        next()
    } catch (error) {
        next(error)
    }
}