import MikroServiceBranch from "./mikro.service.js";
import CustomError from "../../utils/helper/errors/custom.error.js";
import courseModel_ from "../../utils/resurs/models/courseModel_.js";

export default class MakroServiceBranch {
    constructor() { }

    static async createCourse(body) {
        await MikroServiceBranch.checkExistBranch(body.branch_id);
        await MikroServiceBranch.checkExistsTeacher(body.teacher_id);
        const result = await courseModel_.create(body);
        return {
            message: "Kurs muvaffaqiyatli yaratildi!",
        };
    }

    static async deleteCourse(_id) {
        await MikroServiceBranch.checkExistsCourse(_id);
        await MikroServiceBranch.checkRefCourse(_id);
        const result = await courseModel_.deleteOne({ _id });
        if (result.deletedCount === 0) throw new CustomError(400, "Kursni o'chirish amalga oshmadi!");
        return {
            message : "Kurs muvaffaqiyatli o'chirildi!"
        };
    }

    static async updateCourse(body) {
        const { _id, ...updateData } = body;
        await MikroServiceBranch.checkExistsCourse(_id);
        const result = await courseModel_.updateOne({_id}, updateData);
        if (result.matchedCount === 0) throw new CustomError(404, "Kurs topilmadi!");
        if (result.modifiedCount === 0) throw new CustomError(400, "Kursni yangilash amalga oshmadi!");
        return {
            message: "Kurs muvaffaqiyatli yangilandi!"
        };
    }
}
