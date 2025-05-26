import { isValidObjectId } from "mongoose";
import branchModel_ from "../../utils/resurs/models/branchModel_";
import CustomError from "../../utils/helper/errors/custom.error";
import permissionModel_ from "../../utils/resurs/models/permissionModel_";
import courseModel_ from "../../utils/resurs/models/courseModel_";

async function getById(id) {
    if (!isValidObjectId(id)) {
        throw new CustomError(400, "Invalid Id !")
    }
    const branch = await branchModel_.findById(id)
    if (!branch) throw new CustomError(404, "Branch not found !")
    return branch
}
async function checkRef(_id) {
    let exists = await permissionModel_.findOne({branch_id:_id})
    if(exists) throw new CustomError(400, "Branch delted not acceptly of permission in branch !")
    exists = await courseModel_.countDocuments({branch_id:_id})
    if(exists) throw new CustomError(400, "Branch delted not acceptly of course in branch !")
}

export default class BranchService {
    constructor() { }

    static async getAll() {

    }
    static async createItem(body) {
        const newBranch = await branchModel_.create(body)

        return {
            message: "New branch created !"
        }
    }
    static async updateItem(body) {
        
        let _id = body._id
        
        const exitsBranch = await getById(_id)
        const result = await branchModel_.updateOne({ _id }, body, { new: true })

        if (result.modifiedCount === 0) {
            throw new CustomError(400, "User updated not complieted ! ")
        }
        return {
            message: "branch updated !"
        }
    }
    static async deleteItem(_id) {
        await checkRef(_id)
        await getById(_id)
        
        const result = await branchModel_.deleteOne({ _id })

        if (result.deletedCount === 0) {
            throw new CustomError(400, "Branch deleted not complieted !")
        }        
            return {
            message: "Branch delted !"
        }
    }
}