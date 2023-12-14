import { Request, Response } from "express";
import { Activity_Details } from "../models/Activity_Details";
import dayjs from "dayjs";
import { validate } from "class-validator";

//Crear
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

//Modificar 
const updateActivity_Details = async(req: Request, res: Response) => {
  try {
    //Recuperamos el id 
    const activity_DetailsId = req.body.id;
    //Comprobamos que el id exista
    const existActivity_Details = await Activity_Details.findOneBy({
      id: parseInt(activity_DetailsId)
    })
    if (!existActivity_Details){
      return res.json ("El id no existe")
    }

    //Recuperamos la información que van a modificar
    const { id_details, id_activity } = req.body;
    console.log(req.body, "soy el body")

        // Validamos que id_details sea un número y no sea undefined
        if (typeof id_details !== 'number' || id_details === undefined ) {
          return res.json({
            success: false,
            message: "El campo id_details debe ser un número y no puede ser undefined.",
          });
        }
    
        // Validamos que id_activity sea un número y no sea undefined
        if (typeof id_activity !== 'number' || id_activity === undefined ) {
          return res.json({
            success: false,
            message: "El campo id_activity debe ser un número y no puede ser undefined.",
          });
        }
    //Actualizamos los datos
   await Activity_Details.update(
      {
        id : parseInt(activity_DetailsId),
      },
      {
        id_details,
        id_activity
      }
    );
    return res.json ({
      success: true,
      message: "Actualizado",
    })
   

  } catch (error) {
    console.log("error", error);
    return res.json({
      succes: false,
      message: `No se ha podido actualizar la información.`,
      error: error,
    });
  }
};

//Recuperamos por el Id
const getActivity_DetailsById = async(req: Request, res: Response) => {
  try {
    //Recuperamos el id a través del body
    const activity_DetailsId = req.body.id;
    //Comprobamos si existe
    const activity_details = await Activity_Details.findOneBy({
      id: parseInt(activity_DetailsId)
    })
    //Validación
    if (!activity_DetailsId){
      return res.status(403).json("El id no existe.");
    } 

    return res.json({
      message: "Información",
      data: activity_details,
    })
  } catch (error) {
    return res.json({
      succes: false,
      message: "No se ha podido procesar la solicitud.",
      error: error,
    });
  }};

const getAllActivity_Details = async(req: Request, res: Response) => {
  try {
    // Recuperamos a todos los detalles
    const activity_Details = await Activity_Details.find();
    // Comprobamos si hay detalles registrados.
    if (activity_Details.length == 0) {
      return res.json({
        success: true,
        message: `Actualmente, no hay registrados.`,
      });
    } else {
      return res.json({
        succes: true,
        message: "Datos de todos",
        data: activity_Details,
      });
    }
  } catch (error) {
    return res.json({
      succes: false,
      message: "No hemos podido recuperar la información",
      error: error,
    });
  }
};

const deleteActivity_Details = async(req: Request, res: Response) => {
  try {
    //Lógica para eliminar detalle por el Id a través del body.
    const activity_DetailsId = req.body.id;
    const activity_DetailsDelete = await Activity_Details.findOneBy({
      id: parseInt(activity_DetailsId),
    });

    if(!activity_DetailsDelete){
      return res.json ("El id no existe")
    }

    const activity_DetailsRemoved = await Activity_Details.remove(activity_DetailsDelete as Activity_Details);
    if (activity_DetailsRemoved) {
      return res.json("Se ha eliminado correctamente");
    }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha eliminado.",
      error: error,
    });
  }
};

export {
  createActivity_Details,
  updateActivity_Details,
  getActivity_DetailsById,
  getAllActivity_Details,
  deleteActivity_Details,
};
