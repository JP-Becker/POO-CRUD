import { BaseDatabase } from "../database/BaseDatabase";
import { Request, Response } from "express"
import { CourseBusiness } from "../business/CourseBusiness";

export class CourseController extends BaseDatabase {

    public getCourses = async(req: Request, res: Response) =>{

        try {

            const q = req.query.q as string | undefined

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.getCourses(q)
            
            res.status(200).send(output) 
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
        }

    // public createSong = async(req: Request, res: Response) => {
    //     try {

    //         const input = {
    //             id: req.body.id, 
    //             artist: req.body.artist, 
    //             name: req.body.name, 
    //             uploaded_at: req.body.uploaded_at, 
    //             total_views: req.body.total_views
    //         }

    //         const songBusiness = new SongBusiness()
    //         const output = await songBusiness.createSong(input)
            
    //         res.status(200).send(output);

    //     } catch (error) {
    //         console.log(error)
    
    //         if (req.statusCode === 200) {
    //             res.status(500)
    //         }
    
    //         if (error instanceof Error) {
    //             res.send(error.message)
    //         } else {
    //             res.send("Erro inesperado")
    //         }
    //     }
    //     }

    // public editSong = async(req: Request, res: Response) => {
    //     try {

    //         const input = {
    //             newId: req.body.id,
    //             newArtist: req.body.artist,
    //             newName: req.body.name,
    //             newTotalViews: req.body.total_views,
    //             paramsId: req.params.id
    //         }

    //         const songBusiness = new SongBusiness()
    //         const output = await songBusiness.editSong(input)

    //         res.status(200).send(output);
    //     } catch (error) {
    //         console.log(error)
    
    //         if (req.statusCode === 200) {
    //             res.status(500)
    //         }
    
    //         if (error instanceof Error) {
    //             res.send(error.message)
    //         } else {
    //             res.send("Erro inesperado")
    //         }
    //     }
    // }

    // public deleteSong = async(req: Request, res: Response) => {
    //     try {
    //         const id = req.params.id;
        
    //         const songBusiness = new SongBusiness()
    //         const output = await songBusiness.deleteSong(id)
        
    //         res.status(200).send(output)
        
    //     } catch (error) {
    //         console.log(error);
        
    //         if (req.statusCode === 200) {
    //             res.status(500);
    //         }
        
    //         if (error instanceof Error) {
    //             res.send(error.message);
    //         } else {
    //             res.send("Erro inesperado");
    //         }
    //     }
    // }
}
