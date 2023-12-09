import { Request, Response } from "express"

const getAllUsers = (req: Request, res: Response) => {
    return res.send("Profile")
    }

export {
    getAllUsers
}