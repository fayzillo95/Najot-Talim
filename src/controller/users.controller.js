import UserService from "../service/users/users.service"

export default class UserController {
    constructor() {}

    static async createUser (req, res, next) {
    try {
        req.userData = await UserService.register(req.body, req.files.img)
        next()
    } catch (error) {
        next(error)
    }        
    }
    static async UpdateUser (req, res, next) {
        try {
            req.userData = await UserService.update(req.body)
            next()
        } catch (error) {
            next(error)
        }
    }
    static async deleteUser (req, res, next) {
        try {
            req.userData = await UserService.deleteItem(req.body._id)
            next()
        } catch (error) {
            next(error)
        }
    }
    static async getOneUser (req, res, next) {
        try {
            let id = req.body._id
            req.userData = await UserService.readById(id)
            next()
        } catch (error) {
            next(error)
        }
    }
    static async getAllUsers (req, res, next) {
        try {
            req.userData = await UserService.readAllItems()
            next()
        } catch (error) {
            next(error)
        }
    }
}