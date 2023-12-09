import { Request, Response } from "express"

const getAllReviews = (req: Request, res: Response) => {
    return res.send("Review")
    }

export {
    getAllReviews
}