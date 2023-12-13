import { Request, Response } from "express";

const createActivity = (req: Request, res: Response) => {
  return res.send("Crear actividad");
};
const updateActivity = (req: Request, res: Response) => {
  return res.send("Modificar actividad");
};
const getActivityById = (req: Request, res: Response) => {
  return res.send("Recuperar actividad por Id");
};
const getActivityByType = (req: Request, res: Response) => {
  return res.send("Recuperar actividad por Type");
};
const getAllActivities = (req: Request, res: Response) => {
  return res.send("Recuperar todas las actividades");
};
const deleteActivity = (req: Request, res: Response) => {
  return res.send("Eliminar actividad");
};
export { getAllActivities, createActivity, updateActivity, getActivityById, getActivityByType, deleteActivity };
