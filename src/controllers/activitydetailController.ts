import { Request, Response } from "express"

const getAllDetails = (req: Request, res: Response) => {
    return res.send("Activity detail")
    }

export{
    getAllDetails
}