import { Request, Response } from "express"
import { Bussiness } from "../models/Bussiness";
import dayjs from "dayjs";
import { validate } from "class-validator";

const createBussiness = async (req: Request, res: Response) => {
  try {
    //Recuperamos la información que nos envían desde el body
    const { name, description, phone, email, ubication } = req.body;

    //Creamos un objeto para la validación
    const Bussinessvalidate = new Bussiness();
    Bussinessvalidate.name = name.trim();
    Bussinessvalidate.description = description.trim();
    Bussinessvalidate.phone = phone;
    Bussinessvalidate.email = email;
    Bussinessvalidate.ubication = ubication.trim();
    Bussinessvalidate.updated_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );
    Bussinessvalidate.created_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );

    console.log(req.body, "soy tu body");

    //Evaluamos la validacion mediante class-validator validate
    const errorValidate = await validate(Bussinessvalidate);
    if (errorValidate.length > 0) {
      return res.status(404).json(errorValidate);
    } 

      const newBussiness = await Bussiness.create({
        name,
        description,
        phone,
        email,
        ubication
      }).save();

      if (newBussiness) {
        return res.json({
          success: true,
          message: `Ha sido creado con éxito.`,
          data: newBussiness,
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
  const updateBussiness = (req: Request, res: Response) => {
    return res.send("Update");
  };
  const getBussinessById = (req: Request, res: Response) => {
    return res.send("By Id");
  };
  
  const getAllBussiness = (req: Request, res: Response) => {
    return res.send("All");
  };
  const deleteBussiness = (req: Request, res: Response) => {
    return res.send("Delete");
  };


export {
    createBussiness, updateBussiness, getBussinessById, getAllBussiness, deleteBussiness
}