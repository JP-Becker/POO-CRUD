import { BaseDatabase } from "../database/BaseDatabase";
import { Request, Response } from "express"
import { CourseBusiness } from "../business/CourseBusiness";
import { BaseError } from "../errors/BaseError";

export class CourseController extends BaseDatabase {

    // CLASSE PARA CONTROLE DOS ENPOINTS DE CRUD DA TABELA COURSES

    public getCourses = async(req: Request, res: Response) =>{

        try {

            const q = req.query.q as string | undefined

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.getCourses(q)
            
            res.status(200).send(output) 
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        }

    public createCourse = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons,
            }

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.createCourse(input)

            res.status(201).send(output) 

        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        
        }    

    public editCourse = async (req: Request, res: Response) => {
        try {
            const input = {
            newId: req.body.id,
            newName: req.body.name,
            newLessons: req.body.lessons,
            id: req.params.id
        }

        const courseBusiness = new CourseBusiness()
        const output = await courseBusiness.editCourse(input)

        res.status(201).send(output);
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } 
        }
        }

    public deleteCourse = async (req: Request, res: Response) => {
        try {
            const input = req.params.id

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.deleteCourse(input)

            res.status(201).send(output);
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } 
        }
        }
}
