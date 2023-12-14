import { Request, Response } from "express"

const createBussiness = (req: Request, res: Response) => {
    return res.send("Create");
  };
  const updateBussiness = (req: Request, res: Response) => {
    return res.send("Update");
  };
  const getBussinessById = (req: Request, res: Response) => {
    return res.send("By Id");
  };
  
  const getAllBussiness = (req: Request, res: Response) => {
    return res.send("All");
  };
  const deleteBussiness = (req: Request, res: Response) => {
    return res.send("Delete");
  };


export {
    createBussiness, updateBussiness, getBussinessById, getAllBussiness, deleteBussiness
}