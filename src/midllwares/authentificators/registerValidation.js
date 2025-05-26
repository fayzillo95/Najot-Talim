import ValidationError from "../../utils/helper/errors/ValidationError"
import Validations from "../../utils/helper/validation/validation.class"

export default (req, res, next) => {
    try {
        if(!req.body || Object.values(req.body).length === 0) throw new ValidationError(400,"Invalid body epty object !")
        const {error} = Validations.regiterValid(req.body)
        if(error){
            throw new ValidationError(401,error.details.join(" | "))
        }
        next()
    } catch (error) {
        next(error)
    }
}