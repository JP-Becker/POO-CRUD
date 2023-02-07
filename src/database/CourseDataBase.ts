import { CourseDB } from "../types"; 
import { BaseDatabase } from "./BaseDatabase";



// classe de database para os métodos da tabela courses
export class CourseDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"

    public async findCourses (q: string | undefined) {
        let coursesDB

        if (q) {
            const result: CourseDB[] = await BaseDatabase
                .connection(CourseDatabase.TABLE_COURSES)
                .where("name", "LIKE", `%${q}%`)
            coursesDB = result
        } else {
            const result: CourseDB[] = await BaseDatabase
                .connection(CourseDatabase.TABLE_COURSES)
            coursesDB = result
        }

        return coursesDB
    }

    public async findCourseById(id: string) {
        const [ CourseDB ]: CourseDB[] | undefined[] = 
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .where({ id })

        return CourseDB
    }

    public async insertCourse(newCourseDB: CourseDB) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .insert(newCourseDB)
    }

    public async updateCourse(editedCourseDB: CourseDB, id: string) {
        await BaseDatabase.connection(CourseDatabase.TABLE_COURSES)
            .update(editedCourseDB)
            .where({ id })
    }
    
    public async deleteCourse(id: string) {
        await BaseDatabase.connection(CourseDatabase.TABLE_COURSES)
            .del()
            .where({ id })
    }
    
}
