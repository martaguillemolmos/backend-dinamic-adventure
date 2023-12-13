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
    (Detailsvalidate.type = "requiriments"), "details", "itinerary";
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
      const isDuplicate = await Details.findOne({
        where: { type, information },
      });
      if (isDuplicate) {
        // Ya existe una entrada con la misma combinación de type e information
        return res
          .status(400)
          .json({ message: "La combinación de type e information ya existe." });
      }
      const newDetail = await Details.create({
        type,
        information: information.trim(),
      }).save();

      if (newDetail) {
        return res.json({
          success: true,
          message: `Ha sido creado con éxito.`,
          data: newDetail,
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

//Modificar uno de los detalles.
const updateDetailsById = async (req: Request, res: Response) => {
  try {
    //Recuperamos el id 
    const detailsId = req.body.id;
    //Comprobamos que el id exista
    const existDetails = await Details.findOneBy({
      id: detailsId
    })
    if (!existDetails){
      return res.json ("El id no existe")
    }

    //Recuperamos la información que van a modificar
    const {type, information } = req.body;

    // Validar el formato de los nuevos datos.
    if (type !== undefined && type.trim() !== "") {
      return res.json("El type no es válido");
    }
    if (
      information !== undefined &&
      information.trim() !== "" &&
      information.length > 400
    ) {
      return res.json("Número máx. de caracteres 400.");
    }

    //Actualizamos los datos
   await Details.update(
      {
        id : parseInt(detailsId),
      },
      {
        type,
        information
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

//Recuperamos un detalle por su id.
const getDetailsById = async(req: Request, res: Response) => {
  try {
    //Recuperamos el id del details a través del body
    const detailsId = req.body.id;
    //Comprobamos si existe
    const details = await Details.findOneBy({
      id: parseInt(detailsId)
    })
    //Validación
    if (!detailsId){
      return res.status(403).json("El id no existe.");
    } 

    return res.json({
      message: "Información del detalle",
      data: details,
    })
  } catch (error) {
    return res.json({
      succes: false,
      message: "No se ha podido procesar la solicitud.",
      error: error,
    });
  }
};

const getDetailsByType = async (req: Request, res: Response) => {
  try {
    //Recuperamos el id del details a través del body
    const typeBody = req.body.type;
    //Comprobamos si existe
    const details = await Details.find({
      where : {type: typeBody},
    })
    //Validación
    if (!typeBody){
      return res.status(403).json(`No existe ningun detalle con este type.`);
    } 
    return res.json({
      message: "Información del detalle",
      data: details,
    })
  } catch (error) {
    return res.json({
      succes: false,
      message: "No se ha podido procesar la solicitud.",
      error: error,
    });
  }};

const getAllDetails = async(req: Request, res: Response) => {
  try {
    // Recuperamos a todos los detalles
    const details = await Details.find();
    // Comprobamos si hay detalles registrados.
    if (details.length == 0) {
      return res.json({
        success: true,
        message: `Actualmente, no hay detalles registrados.`,
      });
    } else {
      return res.json({
        succes: true,
        message: "Datos de todos los detalles",
        data: details,
      });
    }
  } catch (error) {
    return res.json({
      succes: false,
      message: "No hemos podido recuperar los detalles.",
      error: error,
    });
  }
};

const deleteDetailsById = async(req: Request, res: Response) => {
  try {
    //Lógica para eliminar producto por el Id a través del body.
    const detailsId = req.body.id;
    const detailDelete = await Details.findOneBy({
      id: parseInt(detailsId),
    });

    if(!detailDelete){
      return res.json ("El detalle no existe")
    }

    const detailRemoved = await Details.remove(detailDelete as Details);
    if (detailRemoved) {
      return res.json("Se ha eliminado el detalle correctamente");
    }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha eliminado el detalle",
      error: error,
    });
  }
};

export {
  getAllDetails,
  createDetails,
  getDetailsById,
  getDetailsByType,
  updateDetailsById,
  deleteDetailsById,
};
