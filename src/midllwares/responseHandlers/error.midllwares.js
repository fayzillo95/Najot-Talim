import { logger } from "../../utils/resurs/logs/logger_.js"


export const errorMidllwares =  (err, req, res, next) => {
    console.log(err.stack.split("\n"))
    if (err.status) {
        logger.info(err.message)
        return res.status(err.status).json({
            succes: false,
            message: err.message
        })
    }
    logger.error(err.message)
    return res.status(500).json({
        succes: false,
        message: "Internal server error !"
    })
} 