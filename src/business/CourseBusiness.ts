import { Course } from "../models/Course"
import { CourseDatabase } from "../database/CourseDataBase"


export class CourseBusiness {
    public getCourses = async (input: any) => {
        const courseDatabase = new CourseDatabase()
        const CourseDB = await courseDatabase.findCourses(input)
    
        const courses: Course[] = CourseDB.map((CourseDB) => new Course(
            CourseDB.id,
            CourseDB.name,
            CourseDB.lessons
        ))
    
        const output = {"Lista de todos os cursos ": courses}
    
        return output
    }
}
