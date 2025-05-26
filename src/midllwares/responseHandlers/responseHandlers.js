export const responseHandlers = (req, res, next) => {
    try {
        res.status(req.status || 200).json(req.userData)
    } catch (error) {
        next(error)
    }
}