import { Request, Response } from "express";

//Crear detalles de la actividad

const createDetails = (req: Request, res: Response) => {
  return res.send("Create details");
};

const updateDetailsById = (req: Request, res: Response) => {
  return res.send("Updated details by Id");
};

const getDetailsById = (req: Request, res: Response) => {
  return res.send("Get details by Id");
};

const getDetailsByType = (req: Request, res: Response) => {
    return res.send("Get details by Type");
  };

const getAllDetails = (req: Request, res: Response) => {
  return res.send("Activity detail");
};

const deleteDetailsById = (req: Request, res: Response) => {
    return res.send("Detele detail");
  };

export { getAllDetails, createDetails, getDetailsById, getDetailsByType, updateDetailsById, deleteDetailsById };
