import { Request, Response } from "express"

const getAllActivities =  (req: Request, res: Response) => {
    return res.send("Activities")
    }

export {
    getAllActivities
}