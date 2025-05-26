import JWT from "jsonwebtoken";

export default (payload) => {
    const accessToken = JWT.sign(payload, process.env.JWT_A_KEY, {expiresIn:'24h'})
    const refreshToken = JWT.sign(payload, process.env.JWT_A_KEY, {expiresIn:'2d'})
    return {
        success:true,
        accessToken,refreshToken
    }
}