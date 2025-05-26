import bcrypt from "bcrypt"
import path from "path";
import fs from "fs";
import CustomError from "../../utils/helper/errors/custom.error.js";
import userModel_ from "../../utils/resurs/models/userModel_.js";
import { isValidObjectId } from "mongoose";
import AuthorizationError from "../../utils/helper/errors/Authorization.error.js";
import ValidationError from "../../utils/helper/errors/ValidationError.js";

function getPath(fileName) {
    let filePath = path.join(process.cwd(), "src", "utils", "uploads")
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)
    }
    return path.join(filePath, fileName)
}
async function getById(id) {
    if (!isValidObjectId(id)) {
        throw new CustomError(400, "invalid Id !")
    }
    const user = await userModel_.findById(id)
    if (!user) {
        throw new CustomError(404, "User not found !")
    }
    return user
}

export default class UserService {
    constructor() { }

    static async register(body, file) {
        const existsuser = await userModel_.findOne({ email: body.email })
        if (existsuser) throw new ValidationError(406, "User email already exists !")

        body.profile_img = new Date().getTime() + "_" + file.name
        const fullPath = getPath(body.profile_img)
        await file.mv(fullPath, (error) => {
            if (error) throw new CustomError(400, "Fileni yzishda muammo chiqdi !")
        })

        body.password = await bcrypt.hash(
            body.password,
            process.env.HASH
        )

        const user = await userModel_.create(body)
        return {
            id: user._id
        }
    }
    static async sign(body) {
        const user = await userModel_.findOne({ email: body.email })
        const dehashed = await bcrypt.compare(body.password, user.password)
        if (!dehashed) throw new AuthorizationError(406, "Invalid email or password !")
        return {
            id: user._id
        }
    }
    static async update(body) {
        let id = body._id

        const user = await getById(id)
        delete body._id

        const result = await userModel_.updateOne({ _id: id }, body, { new: true })

        if (result.modifiedCount == 0) throw new CustomError("User updated not compllieated !");

        return {
            message: "User updated !"
        }
    }
    static async deleteItem(id) {
        const user = await getById(id)
        const result = await userModel_.deleteOne({ _id: id })
        if (result.deletedCount == 0) throw new CustomError("User deleted not compllieated !");
        return {
            message: "User deleted !"
        }
    }
    static async readAllItems() {

    }
    static async readById(id) {
        const user = await getById(id)
        return user
    }
    static async readByQuery(filter) {
        const user = await userModel_.findOne(filter)
        return user
    }

}