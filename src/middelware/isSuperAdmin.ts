import { NextFunction, Response } from "express";

const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {
    //si es diferente de super_admin no puedes pasar y salta el mensaje "No puedes pasar"
    if (req.token.role !== "super_admin") {
        return res.json ("No tienes autorización.")
    }
  
    next()
};

export { isSuperAdmin };
