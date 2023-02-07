import { Course } from "../models/Course"
import { CourseDatabase } from "../database/CourseDataBase"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { CourseDB } from "../types"


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

    public createCourse = async (input: any) => {
        const { id, name, lessons } = input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string");
        } 
        if (id[0] !== "c") {
            throw new BadRequestError("'id' deve começar com a letra 'c'");
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string");
        } 
        if (name.length < 3) {
            throw new BadRequestError("'name' deve ter pelo menos 3 caracteres");
        } 

        if (typeof lessons !== "number") {
            throw new BadRequestError("'lessons' deve ser number");
        } 
        if (lessons < 0) {
            throw new BadRequestError("'lessons' nao pode ser inferior a 0");
        } 

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCourseById(id)

        if (courseDBExists) {
            throw new BadRequestError("Essa 'id' de curso já existe");
        }
      
        const newCourse = new Course (
            id,
            name,
            lessons
        )

        const newCourseDB: CourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }

        await courseDatabase.insertCourse(newCourseDB)
            
        const output = {
            message: "Curso criado com sucesso",
            Curso: newCourse,
            }

        return output;
    }

    public editCourse = async (input: any) => {
        const { newId, newName, newLessons, id } = input

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCourseById(id)

        if (!courseDBExists) {
            throw new NotFoundError("Esse curso não existe");
        }

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                throw new BadRequestError("'id' deve ser do tipo string");
            }
            if (newId[0] !== "c") {
                throw new BadRequestError("'id' deve começar com a letra 'c'");
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new BadRequestError("'Name' deve ser do tipo string");
            }
            if (newName.length < 3) {
                throw new BadRequestError("'name' deve ter pelo menos 3 caracteres");
            }
        }

        if (newLessons !== undefined) {
            if(typeof newLessons !== "number") {
                throw new BadRequestError("'lessons' deve ser um número");
            }
            if(newLessons < 0) {
                throw new BadRequestError("'lessons' não pode ser menor que 0");
            }
        }

        const editedCourse = new Course (
            newId,
            newName,
            newLessons
        )

        const editedCourseDB: CourseDB = {
            id: editedCourse.getId() || courseDBExists.id,
            name: editedCourse.getName() || courseDBExists.name,
            lessons: editedCourse.getLessons() || courseDBExists.lessons
        }

        await courseDatabase.updateCourse(editedCourseDB, id)

        const output = {
            message: "Curso editado",
            Curso: editedCourseDB
        };

        return output;
    }
}
