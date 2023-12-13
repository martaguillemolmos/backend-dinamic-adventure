import dayjs from "dayjs";
import { Request, Response } from "express";
import { Details } from "../models/Details";
import { validate } from "class-validator";

//Crear detalles de la actividad

const createDetails = async (req: Request, res: Response) => {
  try {
    //Recuperamos la información que nos envían desde el body
    const { type, information } = req.body;

    //Creamos un objeto para la validación
    const Detailsvalidate = new Details();
    Detailsvalidate.type = "requiriments", "details", "itinerary";
    Detailsvalidate.information = information.trim();
    Detailsvalidate.updated_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );
    Detailsvalidate.created_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );

    console.log(req.body, "soy tu body");

    //Evaluamos la validacion mediante class-validator validate
    const errorValidate = await validate(Detailsvalidate);
    if (errorValidate.length > 0) {
      return res.status(404).json(errorValidate);
    } else {
        const newDetail = await Details.create({
            type,
            information: information.trim()
        }).save ();
    
        if(newDetail){
            return res.json({
                success: true,
                message: `Ha sido creado con éxito.`,
                data: newDetail
              });
        }
    }
    
  } catch (error) {
    console.log("error", error);
    return res.json({
      succes: false,
      message: `No se ha podido crear el detalle.`,
      error: error,
    });
  }
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

export {
  getAllDetails,
  createDetails,
  getDetailsById,
  getDetailsByType,
  updateDetailsById,
  deleteDetailsById,
};
