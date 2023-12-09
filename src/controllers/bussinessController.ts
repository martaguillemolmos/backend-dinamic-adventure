import { Request, Response } from "express"

const getAllBussiness = (req: Request, res: Response) => {
    return res.send("Bussiness")
    }

export {
    getAllBussiness
}