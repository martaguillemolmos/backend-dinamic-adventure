import { Request, Response } from "express"

const createAppointment = (req: Request, res: Response) => {
    return res.send("Create");
  };
  const updateAppointment = (req: Request, res: Response) => {
    return res.send("Update");
  };
  const getAppointmentById = (req: Request, res: Response) => {
    return res.send("By Id");
  };
  
  const getAllApointments = (req: Request, res: Response) => {
    return res.send("Appointment")
    }

  const deleteAppointment = (req: Request, res: Response) => {
    return res.send("Delete");
  };
  

export{
    getAllApointments, createAppointment, updateAppointment, getAppointmentById, deleteAppointment
}