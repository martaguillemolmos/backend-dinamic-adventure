import { Request, Response } from "express";
import { Users } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import dayjs from "dayjs";

// Register: Crear nuevos usuarios
const createUser = async (req: Request, res: Response) => {
  
  let error = {
    message: `Usuario no registrado, valida los campos.`,
  }

  let formatDate = new Date(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));

  try {
    // Recuperamos la información que nos envían desde el body
    const { name, surname, phone, email, password } = req.body;

    //Creamos un objeto para la validación
    const Uservalidate = new Users();
    Uservalidate.name = name.trim();
    console.log(Uservalidate.name);
    Uservalidate.surname = surname.trim();
    Uservalidate.phone = phone;
    Uservalidate.email = email;
    Uservalidate.password = password.trim();
    Uservalidate.is_active = true;
    Uservalidate.role = "user";
    Uservalidate.updated_at = formatDate;
    Uservalidate.created_at = formatDate;
    console.log(req.body, "soy tu body");

    //Evaluamos la validacion mediante class-validator validate
    const errorValidate = await validate(Uservalidate);
    if (errorValidate.length > 0) {
      return res.status(404).json({
        message: "Comprueba de nuevo los campos.",
        data: errorValidate
      })

    }

    //Encriptamos la contraseña antes de guardarla
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
          user_token: "",
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "2h",
        }
      );
      return res.json({
        status: 200,
        success: true,
        message: `Bienvenid@ a tu perfil, ${newUser.name}`,
        token: token,
        name: newUser.name,
      });
    } return res.status(404).json(error);
  } catch (error) {
    return res.status(500).json({
      message: `Usuario no registrado, valida los campos.`,
    });
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
      return res.status(404).json({
        message: `Usuario o contraseña incorrecta.`,
      });
    }

    // Validación de que el email sea @
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegex.test(email) || email.length == 0 || email.length > 50) {
      return res.json(
        "Formato de email incorrecto. Recuerda: Número máx. de caracteres 50."
      );
    }

    // Validación que el password contiene como mínimo y como máximo.
    if (password.length < 6 || password.length > 12) {
      return res.json("El password debe contener de 6 a 12 caracteres.");
    }
    //Consultar en BD si el usuario existe
    const user = await Users.findOneBy({
      email: email.trim(),
    });

    // En el caso que el usuario no sea el mismo
    if (!user) {
      return res.status(404).json({message: "Usuario o contraseña incorrecta"});
    }
    //Comprobamos si el usuario está activo
    if (!user?.is_active) {
      return res.status(404).json({message: "Usuario o contraseña incorrecta"});
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
          user_token: "",
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
        role: user.role,
      });
    } else {
      return res.status(404).json({message: "Usuario o contraseña incorrecta"});
    }
  } catch (error) {
    return res.status(500).json({
      message: `Usuario o contraseña incorrecta.`,
    })
  }
};

//Logearse como un usuario
const loginSuper = async (req: Request, res: Response) => {
  try {
    const tokenSuper = req.token;
    console.log(tokenSuper, "este es el token");
    const { id_user } = req.body;

    if (!tokenSuper) {
      return res.json("No tienes token");
    }
    // Comprobamos que nos envían characteres.
    if (!id_user) {
      return res.json("Para procesar la solicitud es necesario el id");
    }

    //Consultar en BD si el usuario existe
    const user = await Users.findOneBy({
      id: id_user,
    });

    // En el caso que el usuario no sea el mismo
    if (!user) {
      return res.status(403).json("Usuario o contraseña incorrecta");
    }

    const token = jwt.sign(
      {
        id: tokenSuper.id,
        role: tokenSuper.role,
        is_active: tokenSuper.is_active,
        user_token: user,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );

    //Logearse con el token, añadiendole el campo de user_token
    return res.json({
      success: true,
      message: `Bienvenid@ a al perfil de: ${user.name}`,
      token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};


// Perfil
const profileUser = async (req: any, res: Response) => {
  try {

    let error = {
      status: 404,
      success: false,
      message: `Usuario o contraseña incorrecta.`,
    }

    // Recuperamos el token descifrado
    const token = req.token;

    // Validar si el token es una cadena vacía
    if (token === "") {
        return res.json(error);
    }

    let user;

    if (!token.user_token) {
        user = await Users.findOneBy({
            id: req.token.id,
        });
    } else {
        user = await Users.findOneBy({
            id: token.user_token.id,
        });
    }

    if (!user) {
        return res.json(error);
    }

    if (!user?.is_active) {
      return res.json(error);
    }

    return res.json({
        status: 200,
        success:true,
        message: "Datos del perfil:",
        data: user,
    });
    
} catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: `Usuario o contraseña incorrecta.`,
    });
}
};

// Modificar la información del perfil.
const updateUser = async (req: Request, res: Response) => {
  try {
    let user;
    if (req.token.is_active == true) {
      //Lógica para actualizar usuarios por su Id. Este lo recuperamos del token.
      user = await Users.findOne({
        where: { id: req.token.id },
      });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }

    // Indicamos los datos que se pueden actualizar a través de esta ruta.
    const { name, surname, phone, email } = req.body;

    // Validar el formato de los nuevos datos.
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (
      email !== undefined &&
      email.trim() !== "" &&
      !emailRegex.test(email) &&
      (email.length == 0 || email.length > 50)
    ) {
      return res.status(404).json(
        "Formato de email incorrecto. Recuerda: Número máx. de caracteres 50."
      );
    }
    if (name !== undefined && name.trim() !== "" && name.length > 50) {
      return res.status(404).json("Número máx. de caracteres 50.");
    }
    if (surname !== undefined && surname.trim() !== "" && surname.length > 50) {
      return res.status(404).json("Número máx. de caracteres 50.");
    }
    if (phone !== undefined && (phone > 999999999 || phone < 600000000)) {
      return res.status(404).json(
        "Introduce un número de 9 caracteres, puede empezar desde el 6."
      );
    }

    let updatedUser;
    //Comprobamos que el usuario exista
    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    } else {
      await Users.update(
        {
          id: req.token.id,
        },
        {
          name,
          surname,
          phone,
          email,
        }
      );
    }

    updatedUser = await Users.findOne({
      where: { id: req.token.id },
    });

    if (updatedUser) {
      return res.status(200).json({
        succes: true,
        message: `Enhorabuena ${updatedUser.name}, tu información se ha actualizado con éxito.`,
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        succes: false,
        message: `${user.name}, no se ha podido actualizar la información.`,
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(404).json({
      succes: false,
      message: `No se ha podido actualizar la información.`,
      error: error,
    });
  }
};

//Modificar el password del usuario.
const updatePassword = async (req: Request, res: Response) => {
  try {
    let user;
    if (req.token.is_active == true) {
      //Recuperamos el id del usuario a través del token
      user = await Users.findOne({
        where: { id: req.token.id },
      });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }

    const passwordRegex = /^[a-zA-Z0-9]+$/;
    const { password, passwordOld } = req.body;

    // Validación para comprobar que no nos envían un string vacío.
    if (
      (password !== undefined && password.trim() === "") ||
      (passwordOld !== undefined && passwordOld.trim() === "")
    ) {
      return res
        .status(404)
        .json({message:"La contraseña debe contener de 6 a 12 caracteres"});
    }
    if (!passwordRegex.test(password)) {
      return res
        .status(404)
        .json({message:"La contraseña no puede contener caracteres especiales."});
    }
    // Validación que el password contiene como mínimo y como máximo.
    if (passwordOld.length < 6 || passwordOld.length > 12) {
      return res
        .status(404)
        .json({message:"La contraseña debe contener de 6 a 12 caracteres"});
    }
    //Comprobamos que el usuario exista
    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    }

    if (passwordOld !== password) {
      if (bcrypt.compareSync(passwordOld, user.password)) {
        const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
        await Users.update(
          {
            id: req.token.id,
          },
          {
            password: encryptedPassword,
          }
        );
        return res
          .status(202)
          .json({message: `${user.name}, la contraseña ha sido modificada`});
      } else {
        return res.status(401).json({
          message: "La contraseña no coincide, vuelva a intentarlo.",
        });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Recuerda: La contraseña debe ser diferente." });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "La contraseña no ha sido modificada.",
      error: error,
    });
  }
};

//Inactivar una cuenta.
const deactivateAccount = async (req: Request, res: Response) => {
  try {
    let user;
    if (req.token.is_active == true) {
      //Recuperamos el id del usuario a través del token
      user = await Users.findOne({
        where: { id: req.token.id },
      });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }

    const { is_active } = req.body;

    // Validación para comprobar que no nos envían un string vacío o es diferente a false
    if (
      (is_active !== undefined && is_active.trim() === "") ||
      is_active !== "false"
    ) {
      return res.status(404).json({ message: `La cuenta no ha sido desactivada.`});
    }

    let accountUser;
    //Comprobamos que el usuario exista
    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    } else {
      accountUser = await Users.update(
        {
          id: req.token.id,
        },
        {
          is_active,
        }
      );
    }
    console.log("user", user);

    if (accountUser) {
      return res.json({
        succes: true,
        message: `Enhorabuena ${user.name}, tu cuenta ha sido inactivada con éxito.`,
      });
    } else {
      return res.json({
        succes: false,
        message: `${user.name}, tu cuenta no ha sido inactivada.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: `La cuenta no ha sido desactivada.`,
      error: error,
    });
  }
};

// Recuperar todos los usuarios
const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Recuperamos a todos los usuarios
    const users = await Users.find();
    // Comprobamos si hay usuarios registrados.
    if (users.length == 0) {
      return res.json({
        success: true,
        message: `Actualmente, no hay usuarios registrados.`,
      });
    } else {
      return res.json({
        succes: true,
        message: "Usuarios registrados.",
        data: users,
      });
    }
  } catch (error) {
    return res.json({
      succes: false,
      message: "No hemos podido recuperar los usuarios",
      error: error,
    });
  }
};

export {
  createUser,
  loginUser,
  profileUser,
  getAllUsers,
  updateUser,
  updatePassword,
  deactivateAccount,
  loginSuper,
};
