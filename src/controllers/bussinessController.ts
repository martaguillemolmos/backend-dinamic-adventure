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
  const updateBussiness = async(req: Request, res: Response) => {
    try {
      //Recuperamos el id 
      const bussinessId = req.body.id;
      //Comprobamos que el id exista
      const existBussiness = await Bussiness.findOneBy({
        id: parseInt(bussinessId)
      })
      if (!existBussiness){
        return res.json ("El id no existe")
      }
  
      //Recuperamos la información que van a modificar
      const { name, description, phone, email, ubication } = req.body;
      console.log(req.body, "soy el body")
  // Validar el formato de los nuevos datos.
  const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
if (
  email !== undefined &&
  email.trim() !== "" &&
  !emailRegex.test(email) &&
  (email.length == 0 || email.length > 50)
) {
  return res.json(
    "Formato de email incorrecto. Recuerda: Número máx. de caracteres 50."
  );
}
if (name !== undefined && name.trim() !== "" && name.length > 50) {
  return res.json("Número máx. de caracteres 50.");
}
if (description !== undefined && description.trim() !== "" && description.length > 250) {
  return res.json("Número máx. de caracteres 250.");
}
if (phone !== undefined && (phone > 999999999 || phone < 600000000)) {
  return res.json(
    "Introduce un número de 9 caracteres, puede empezar desde el 6."
  );
}
if (ubication !== undefined && ubication.trim() !== "" && ubication.length > 250) {
  return res.json("Número máx. de caracteres 250.");
}

      //Actualizamos los datos
     await Bussiness.update(
        {
          id : parseInt(bussinessId),
        },
        {
          name,
          description,
          phone,
          email,
          ubication
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