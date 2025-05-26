export default (req, res, next) => {
    try {
        res.status(req.status || 200).json(req.userData)
    } catch (error) {
        next(error)
    }
}