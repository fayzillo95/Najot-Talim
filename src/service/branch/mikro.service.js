import courseModel_ from "../../utils/resurs/models/courseModel_"
import studentCoursesModel_ from "../../utils/resurs/models/studentCoursesModel_"
import userModel_ from "../../utils/resurs/models/userModel_"

export default class MikroServiceBranch {
    constructor() { }

    static async getAllStudents(branch_id) {
        const branch = await this.checkExistBranch(branch_id)
        
        const courses = await courseModel_.find({branch_id})
        
        const courseIds = courses.map(cours => cours._id)

        const students = await studentCoursesModel_.find({
            course_id:{$in:courseIds}
        }).populate("user_id")
        
        return {
            message : "Talabalar muvaffaqiyatli o'qib olindi!",
            filial : branch.name,
            students
        }
    }
    static async getAllTeachers(branch_id) {
        const branch = await this.checkExistBranch(branch_id)
        
        const courses = await courseModel_.find({branch_id})
        
        const teacherIds = courses.map(course => course.teacher_id)
        
        const teachers = await userModel_.find({
            _id: {$in : teacherIds},
            role : "teacher"    
        })

        return {
            message: "O'qituvchilar muvaffaqiyatli o'qib olindi!",
            branch : {
                name : branch.name,
                teachers
            }
        }        
    }
    static async getAllCourses(branch_id) {
        const branch = await this.checkExistBranch(branch_id)
        const data = await courseModel_.find({branch_id})
        return {
            message: "Kurslar muvaffaqiyatli o'qib olindi!",
            branch : {
                name : branch.name,
                courses: data
            }
        }
    }
    static async checkExistBranch(branch_id) {
        if (!isValidObjectId(branch_id)) {
            throw new CustomError(400, "Noto'g'ri ID yuborildi!")
        }
        const branch = await branchModel_.findById(branch_id)

        if (!branch) throw new CustomError(404, "Filial topilmadi!")

        return branch
    }

    static async checkExistsTeacher(teacher_id) {
        if (!isValidObjectId(teacher_id)) {
            throw new CustomError(400, "Noto'g'ri ID yuborildi!")
        }
        const teacher = await userModel_.findById(teacher_id)
        if (!teacher) throw new CustomError(404, "O'qituvchi topilmadi!")
        if (teacher.role !== "teacher") throw new CustomError(400, "Ushbu foydalanuvchi o'qituvchi emas!")
        return teacher
    }

    static async checkExistsCourse(course_id) {
        if (!isValidObjectId(course_id)) {
            throw new CustomError(400, "Noto'g'ri ID yuborildi!")
        }
        const course = await courseModel_.findById(course_id)
        if (!course) throw new CustomError(404, "Kurs topilmadi!")
        return course
    }

    static async checkRefCourse(course_id) {
        if (!isValidObjectId(course_id)) {
            throw new CustomError(400, "Noto'g'ri ID yuborildi!")
        }
        let exists = await studentCoursesModel_.findOne({ course_id });
        if (exists) throw new CustomError(406, "Ushbu kursda talaba mavjudligi sababli o'chirish mumkin emas!")
        return exists
    }
}
