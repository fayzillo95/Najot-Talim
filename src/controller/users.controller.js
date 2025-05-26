import UserService from "../service/users/users.service.js"

export default class UserController {
    constructor() { }

    static async createUser(req, res, next) {
        try {
            req.userData = await UserService.register(req.body, req.files.img)
            req.status = 201
            next()
        } catch (error) {
            next(error)
        }
    }
    static async UpdateUser(req, res, next) {
        try {
            req.userData = await UserService.update(req.body)
            req.status = 200
            next()
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            req.userData = await UserService.sign(req.body)
            req.status = 201
            next()
        } catch (error) {
            next(error)
        }
    }
    static async deleteUser(req, res, next) {
        try {
            req.userData = await UserService.deleteItem(req.body._id)
            next()
        } catch (error) {
            next(error)
        }
    }
    static async getOneUser(req, res, next) {
        try {
            let id = req.params._id
            req.userData = await UserService.readById(id)
            next()
        } catch (error) {
            next(error)
        }
    }
    static async getAllUsers(req, res, next) {
        try {
            req.userData = await UserService.readAllItems()
            next()
        } catch (error) {
            next(error)
        }
    }
}