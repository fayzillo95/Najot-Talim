import JWT from "jsonwebtoken"
import AuthorizationError from "../../utils/helper/errors/Authorization.error"

export default (req, res, next) => {
    try {
        const auth = req.headers.authorization
        if(!auth.startsWith("Bearer ")){
            throw new AuthorizationError(400, "Invalid type token !")
        }
        const key = process.env.JWT_A_KEY
        const token = auth.split(" ")[1]
        const decode = JWT.verify(token, key)
        req.userData = {id:decode.id}
        next()
    } catch (error) {
        next(error)
    }
}