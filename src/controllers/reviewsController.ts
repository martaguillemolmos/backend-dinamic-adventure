import { Request, Response } from "express"

const createReview = (req: Request, res: Response) => {
    return res.send("Create");
  };
  const updateReview = (req: Request, res: Response) => {
    return res.send("Update");
  };
  const getReviewById = (req: Request, res: Response) => {
    return res.send("By Id");
  };

  const deleteReview = (req: Request, res: Response) => {
    return res.send("Delete");
  };

const getAllReviews = (req: Request, res: Response) => {
    return res.send("Review")
    }

export {
    createReview, updateReview, getReviewById, deleteReview,
    getAllReviews
}