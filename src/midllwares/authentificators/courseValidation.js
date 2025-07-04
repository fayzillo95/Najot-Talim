import ValidationError from "../../utils/helper/errors/ValidationError"
import Validations from "../../utils/helper/validation/validation.class"

export default (req, res, next) => {
    try {
        if(req.body || Object.values(req.body).length === 0) {
            throw new ValidationError(400, "Invalid data empty object body !")
        }
        const {error} = Validations.courseValid(req.body)
        if(error) {
            throw new ValidationError(406, error.details.join(" | ") + " !")
        }
        next()
    } catch (error) {
        next(error)
    }
}