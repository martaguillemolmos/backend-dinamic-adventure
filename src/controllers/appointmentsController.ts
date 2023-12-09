import { Request, Response } from "express"

const getAllApointments = (req: Request, res: Response) => {
    return res.send("Appointment")
    }

export{
    getAllApointments
}