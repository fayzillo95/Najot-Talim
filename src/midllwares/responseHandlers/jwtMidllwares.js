import JWT from "jsonwebtoken"
import generettoken from "../../utils/helper/token/generettoken"

export default (req, res, next) => {
    try {
        const data = generettoken(req.userData)
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}