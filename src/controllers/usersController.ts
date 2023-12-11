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

//Login
const loginUser = async (req: Request, res: Response) => {
    try {
      // Recuperamos los datos guardados en body
      const { email, password } = req.body;
  
      // Comprobamos que nos envían characteres.
      if (
        !req.body.email ||
        !req.body.password ||
        req.body.email.trim() === "" ||
        req.body.password.trim() === ""
      ) {
        return res.json({
          success: true,
          message: "Introduce usuario y contraseña.",
        });
      }
  
      // Validación de que el email sea @
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!emailRegex.test(email) || email.length == 0 || email.length > 50 ){
        return res.json("Formato de email incorrecto. Recuerda: Número máx. de caracteres 50.")
      }
  
      // Validación que el password contiene como mínimo y como máximo.
      if(password.length < 6 || password.length >12) {
        return res.json ("El password debe contener de 6 a 12 caracteres.")
      }
      //Consultar en BD si el usuario existe
      const user = await Users.findOneBy({
        email: email.trim(),
      });
  
      // En el caso que el usuario no sea el mismo
      if (!user) {
        return res.status(403).json("Usuario o contraseña incorrecta");
      }
      //Comprobamos si el usuario está activo
      if (!user?.is_active) {
        return res.status(404).json("Usuario o contraseña incorrecta");
      }
      //Si el usuario si es correcto, compruebo la contraseña
      console.log(user.password);
      if (bcrypt.compareSync(password.trim(), user.password)) {
        //En caso de que hayamos verificado que el usuario es correcto y se corresponde a la contraseña que hemos indicado, generar token
        const token = jwt.sign(
          {
            id: user.id,
            role: user.role,
            is_active: user.is_active,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "2h",
          }
        );
        return res.json({
          success: true,
          message: `Bienvenid@ a tu perfil, ${user.name}`,
          token: token,
          name: user.name,
        });
      } else {
        return res
          .status(403)
          .json({ message: "Usuario o contraseña incorrecta." });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  };

// Perfil
const profileUser = async (req: any, res: Response) => {
    try {
      //Recuperamos el id del usuario a través del token.
      const user = await Users.findOneBy({
        id: req.token.id,
      });
      // Añadimos que, si el usuario en el momento desactive la cuenta, ya no se le permite acceder a su perfil.
      if (!user) {
        return res.status(403).json("Usuario no autorizado.");
      }
  
      if (!user?.is_active) {
        return res.status(404).json("Usuario no autorizado.");
      }
  
      return res.json({
        message: "Datos del perfil",
        data: user,
      });
    } catch (error) {
      return res.json({
        succes: false,
        message: "Usuario no autorizado.",
        error: error,
      });
    }
  };

//Recuperar todos los usuarios
const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Recuperamos a todos los usuarios
        const users = await Users.find();
        // Comprobamos si hay usuarios registrados.
        if (users.length == 0) {
          return res.json({
            success: true,
            message: `Actualmente, no hay usuarios registrados.`
          });
        } else {
          return res.json(
            {
                succes: true,
                message: "Usuarios registrados.",
                data: users,
              }
              );
        }
      } catch (error) {
        return res.json({
          succes: false,
          message: "No hemos podido recuperar los usuarios",
          error: error,
        });
      }};

export {createUser, loginUser, profileUser, getAllUsers };
