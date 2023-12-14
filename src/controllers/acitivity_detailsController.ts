import { Request, Response } from "express";

const createActivity_Details = (req: Request, res: Response) => {
  return res.send("Create");
};
const updateActivity_Details = (req: Request, res: Response) => {
  return res.send("Update");
};
const getActivity_DetailsById = (req: Request, res: Response) => {
  return res.send("By Id");
};

const getAllActivity_Details = (req: Request, res: Response) => {
  return res.send("All");
};
const deleteActivity_Details = (req: Request, res: Response) => {
  return res.send("Delete");
};

export {
  createActivity_Details,
  updateActivity_Details,
  getActivity_DetailsById,
  getAllActivity_Details,
  deleteActivity_Details,
};
