import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenDecored } from "../types";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.json (
        {
        message: "auth_requiered"
      }
      )
    }
    console.log(req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];
    //Comprobamos que el token existe
    if (!token) {
      return res.json({
        message: "auth_requiered"
      });
    }
    //Declaramos la constante que contiene el secreto que debe acompañar a nuestro token
    const secret = process.env.JWT_SECRET
    // hemos utilizado "secreto" y tenemos que escribir lo mismo que hemos indicado en la const token de usersController
    //comprobamos que ese token viene acompañado de "secreto"
    //debemos de declarar la constante secret y acompañarlo con un "as string" porque declaramos que es de tipo string
    const tokenDecored = jwt.verify(token, secret as string) as TokenDecored;
    console.log(tokenDecored)
    req.token = tokenDecored;
    next()
  } catch (error) {
    console.log(error)
    return res.json({
      error: "Not auth",
    });
  }
};

export { auth };
