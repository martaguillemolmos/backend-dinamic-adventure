import { Request, Response } from "express";
import { Activity } from "../models/Activity";
import dayjs from "dayjs";
import { validate } from "class-validator";

const createActivity = async(req: Request, res: Response) => {
  try {
    // Recuperamos la información que nos envían desde el body
    const { title, type, id_details, intensity, minimum_age, description, price, image } = req.body;

    //Creamos un objeto para la validación
    const ActivityValidate = new Activity();
    ActivityValidate.title = title.trim();
    ActivityValidate.type = "terrestre", "acuatica";
    ActivityValidate.intensity = "high", "medium", "low";
    ActivityValidate.minimum_age = minimum_age;
    ActivityValidate.description = description.trim();
    ActivityValidate.price = price;
    ActivityValidate.image = image.trim();
    ActivityValidate.is_active = true;
    ActivityValidate.updated_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );
    ActivityValidate.created_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );

    //Evaluamos la validacion mediante class-validator validate
    const errorValidate = await validate(ActivityValidate);
    if (errorValidate.length > 0) {
      return res.status(404).json(errorValidate);
    }

    const newActivity = await Activity.create({
      title: title.trim(),
      type,
      intensity,
      minimum_age,
      description: description.trim(),
      price,
      image: image.trim()

    }).save();
    if (newActivity) {
      return res.json({
        success: true,
        message: `Se ha creado la actividad`,
        data: newActivity
      });
    }
  } catch (error) {
    console.error("Error en la creación de la actividad:", error);
    res.status(500).json(`Error al crear la actividad: ${error}`);
  }
};


const updateActivity = async (req: Request, res: Response) => {
//Recuperamos el id de la actividad
const activityId = req.body.id;
//Comprobamos que existe el id
const existActivity = await Activity.findOneBy({
  id: parseInt(activityId)
})
// Validamos
if (!existActivity){
  return res.json ("El id no existe")
}

//Recuperamos la información que van a modificar
const { title, type, id_details, intensity, minimum_age, description, price, image } = req.body;
    //Actualizamos los datos
     await Activity.update(
      {
        id : parseInt(activityId),
      },
      {
        title,
        type,
        intensity,
        minimum_age,
        description,
        price,
        image
      }
    );

    //Recuperamos la información actualizada
    const updated = await Activity.findOneBy({
      id: parseInt(activityId)
    })
    
    return res.json ({
      success: true,
      message: "Actualizado",
      data: updated
    })

};

//Recuperamos una actividad por el id
const getActivityById = async(req: Request, res: Response) => {
  try {

    //Recuperamos el id de la actividad a través del body
     const activityId = req.body.id;
    //Comprobamos si existe
    const activity = await Activity.findOneBy({
      id: parseInt(activityId)
    })
    //Validación
    if (!activityId){
      return res.status(403).json("El id no existe.");
    } 

    return res.json({
      message: "Información del detalle",
      data: activity,
    })
  } catch (error) {
    return res.json({
      succes: false,
      message: "No se ha podido procesar la solicitud.",
      error: error,
    });
  }
}

//Recuperamos una actividad por el type
const getActivityByType = async(req: Request, res: Response) => {
  try {
    //Recuperamos el id del details a través del body
    const typeParams = req.params.type;
    //Comprobamos si existe
    const activity = await Activity.find({
      where : {type: typeParams},
    })
    //Validación
    if (!typeParams){
      return res.status(403).json(`No existe ninguna actividad con este type.`);
    } 

    if (activity.length == 0) {
      return res.json({
        success: true,
        message: `Actualmente, no hay actividades registradas con ese type.`,
      });
    }
    return res.json({
      message: "Información de las actividades.",
      data: activity,
    })
  } catch (error) {
    return res.json({
      succes: false,
      message: "No se ha podido procesar la solicitud.",
      error: error,
    });
  }

};

//Recuperamos todas las actividades
const getAllActivities = async (req: Request, res: Response) => {
  try {
    // Recuperamos a todos los detalles
    const activities = await Activity.find();
    // Comprobamos si hay detalles registrados.
    if (activities.length == 0) {
      return res.json({
        success: true,
        message: `Actualmente, no hay actividades registradas.`,
      });
    } else {
      return res.json({
        succes: true,
        message: "Todas las actividades",
        data: activities,
      });
    }
  } catch (error) {
    return res.json({
      succes: false,
      message: "No hemos podido recuperar las actividades.",
      error: error,
    });
  }
};
const deleteActivity = async(req: Request, res: Response) => {
  try {
    //Lógica para eliminar detalle por el Id a través del body.
    const activityId = req.body.id;
    const activityDelete = await Activity.findOneBy({
      id: parseInt(activityId),
    });

    if(!activityDelete){
      return res.json ("La actividad no existe")
    }

    const activityRemoved = await Activity.remove(activityDelete as Activity);
    if (activityRemoved) {
      return res.json("Se ha eliminado la actividad correctamente");
    }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha eliminado la actividad",
      error: error,
    });
  }};
export { getAllActivities, createActivity, updateActivity, getActivityById, getActivityByType, deleteActivity };
