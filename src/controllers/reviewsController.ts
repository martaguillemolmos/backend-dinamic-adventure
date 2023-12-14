import { Request, Response } from "express";
import { Review } from "../models/Review";
import dayjs from "dayjs";
import { validate } from "class-validator";

//Crear
const createReview = async(req: Request, res: Response) => {
  try {
    
    //Recuperamos la información que nos envían desde el body
    const { id_user, id_activity, description, score } = req.body;

    //Creamos un objeto para la validación
    const Reviewvalidate = new Review();
    Reviewvalidate.id_user = id_user;
    Reviewvalidate.id_activity = id_activity;
    Reviewvalidate.description = description.trim();
    Reviewvalidate.score = score;
    Reviewvalidate.is_active = true;
    Reviewvalidate.updated_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );
    Reviewvalidate.created_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );

    console.log(req.body, "soy tu body");

    //Evaluamos la validacion mediante class-validator validate
    const errorValidate = await validate(Reviewvalidate);
    if (errorValidate.length > 0) {
      return res.status(404).json(errorValidate);
    } 
      
      const newReview = await Review.create({
        id_user,
        id_activity,
        description,
        score
      }).save();

      if (newReview) {
        return res.json({
          success: true,
          message: `Ha sido creado con éxito.`,
          data: newReview,
        });
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

//Actualizar
const updateReview = (req: Request, res: Response) => {
  return res.send("Update");
};

//Recuperar por el Id
const getReviewById = (req: Request, res: Response) => {
  return res.send("By Id");
};
//Eliminar
const deleteReview = (req: Request, res: Response) => {
  return res.send("Delete");
};
//Recuperar todos
const getAllReviews = (req: Request, res: Response) => {
  return res.send("Review");
};

export {
  createReview,
  updateReview,
  getReviewById,
  deleteReview,
  getAllReviews,
};
