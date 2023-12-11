import { Request, Response } from "express";
import { Users } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import dayjs from "dayjs";


// Register: Crear nuevos usuarios
const createUser = async (req: Request, res: Response) => {
  try {
    // Recuperamos la información que nos envían desde el body
    const { name, surname, phone, email, password } = req.body;

    //Creamos un objeto para la validación
    const Uservalidate = new Users();
    Uservalidate.name = name.trim();
    console.log(Uservalidate.name)
    Uservalidate.surname = surname.trim();
    Uservalidate.phone = phone;
    Uservalidate.email = email;
    Uservalidate.password = password.trim();
    Uservalidate.is_active = true;
    Uservalidate.role = "user";
    Uservalidate.updated_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );
    Uservalidate.created_at = new Date(
      dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );
    console.log(req.body, "soy tu body");

    //Evaluamos la validacion mediante class-validator validate
    const errorValidate = await validate(Uservalidate);
    console.log(errorValidate, "soy tu error");
    if (errorValidate.length > 0) {
      console.log(errorValidate, "soy tu error");
      return res.status(404).json(errorValidate);
    }

    //Debemos encriptar la contraseña antes de guardarla.
    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const newUser = await Users.create({
      name: name.trim(),
      surname: surname.trim(),
      phone,
      email: email.trim(),
      password: encryptedPassword,
    }).save();
    if (newUser) {
        // Creamos el token
      const token = jwt.sign(
        {
          id: newUser.id,
          role: newUser.role,
          is_active: newUser.is_active,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "2h",
        }
      );
      return res.json({
        success: true,
        message: `Bienvenid@ a tu perfil, ${newUser.name}`,
        token: token,
        name: newUser.name,
      });
    }
  } catch (error) {
    console.error("Error en la creación del usuario:", error);
    res.status(500).json(`Error al crear el usuario: ${error}`);
  }
};

const getAllUsers = (req: Request, res: Response) => {
  return res.send("Profile");
};

export { getAllUsers, createUser };
