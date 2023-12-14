import { Request, Response } from "express";
import { Activity_Details } from "../models/Activity_Details";
import dayjs from "dayjs";
import { validate } from "class-validator";

const createActivity_Details = async(req: Request, res: Response) => {
  try {
    //Recuperamos la información que nos envían desde el body
    const { id_details, id_activity } = req.body;

    //Creamos un objeto para la validación
    const Activity_Detailsvalidate = new Activity_Details();
    Activity_Detailsvalidate.id_details = id_details;
    Activity_Detailsvalidate.id_activity = id_activity;
    Activity_Detailsvalidate.updated_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );
    Activity_Detailsvalidate.created_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );

    console.log(req.body, "soy tu body");

    //Evaluamos la validacion mediante class-validator validate
    const errorValidate = await validate(Activity_Detailsvalidate);
    if (errorValidate.length > 0) {
      return res.status(404).json(errorValidate);
    } else {
      const isDuplicate = await Activity_Details.findOne({
        where: { id_details, id_activity },
      });
      if (isDuplicate) {
        // Ya existe una entrada con la misma combinación de type e information
        return res
          .status(400)
          .json({ message: "La combinación ya existe." });
      }
      const newActivity_Details = await Activity_Details.create({
        id_details,
        id_activity,
      }).save();

      if (newActivity_Details) {
        return res.json({
          success: true,
          message: `Ha sido creado con éxito.`,
          data: newActivity_Details,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      succes: false,
      message: `No se ha podido crear.`,
      error: error,
    });
  }
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
