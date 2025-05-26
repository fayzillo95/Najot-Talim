import { logger } from "../../utils/resurs/logs/logger_"


export default (err, req, res, next) => {
    if (err.status) {
        logger.info(err.message)
        return res.status(err.status).json({
            succes: false,
            message: err.message
        })
    }
    logger.info(err.message)
    return res.status(500).json({
        succes: false,
        message: "Internal server error !"
    })
} 