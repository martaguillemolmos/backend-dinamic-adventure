import { Request, Response } from "express";
import { Users } from "../models/User";
import { Activity } from "../models/Activity";
import dayjs from "dayjs";
import { Appointment } from "../models/Appointment";

const createAppointment = async (req: Request, res: Response) => {
  try {
    if ((req.token.role == "user", "admin" && req.token.is_active == true)) {
      //Recuperar el id del usuario por su token
      console.log("aqui entra", req.token.role);
      const user = await Users.findOne({
        where: { id: req.token.id },
      });

      console.log(user, "soy user");
      if (!user) {
        return res.json("El usuario no existe.");
      }

      const { activity, participants, date_activity, accept_requirements } = req.body;

      console.log(date_activity, "soy la fecha");
      const existActivity = await Activity.findOne({
        where: { id: activity },
      });

      if (!existActivity) {
        return res.json("La actividad no existe.");
      }
      console.log(existActivity.price, "esta es la actividad");

      const dateBody = dayjs(date_activity, "AAAA-MM-DDTHH:mm:ss SSS [Z] A");
      // console.log(dateBody, "esto es dataBody")
      const dateNow = dayjs();

      if (!dateBody.isValid() || dateBody < dateNow) {
        return res.json(
          "El formato de la fecha no es válida o es anterior a la creación de la cita. Es {AAAA} MM-DDTHH:mm:ss SSS [Z] A' "
        );
      }

      if (!dateBody) {
        return res.json("La fecha y hora no puede ser nula.");
      }

      if (accept_requirements === false) {
        return res.json("Debes aceptar la política de reserva para continuar.");
      }

      const existingAppointments = await Appointment.find({
        where: {
          id_activity: activity,
          date: dateBody.toDate(),
          status_appointment: "approved",
        },
      });

        if (existingAppointments) {
        console.log("que ocurre", existingAppointments);
        
        function sumParticipants(b: number []) {
          let a = 0;
          for (let i = 0; i < b.length; i++) {
            a += b[i];
          }
          return a;
        }
        
        const participantsArray = existingAppointments.map(appointment => appointment.participants);
        console.log(participantsArray, "soy todos los participantes");

        const totalParticipants = sumParticipants(participantsArray);
        console.log("soy el total de participantes", totalParticipants);

        if(totalParticipants < 12){
          const newAppointment = await Appointment.create({
            id_user: req.token.id,
            id_activity: activity,
            participants,
            price: existActivity.price,
            date: date_activity,
          }).save();
          console.log(newAppointment, "soy newAppointment?");
          if (newAppointment) {
            return res.json("se ha creado el newAppointment");
          }
          return res.json("No se ha creado la cita.");
        } else {
          return res.json ("No hay disponibilidad")
        }
        
      }
    }
    return res.json("Usuario no autorizado.");
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha creado la cita",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};
const updateAppointment = (req: Request, res: Response) => {
  return res.send("Update");
};
const getAppointmentById = (req: Request, res: Response) => {
  return res.send("By Id");
};

const getAllApointments = (req: Request, res: Response) => {
  return res.send("Appointment");
};

const deleteAppointment = (req: Request, res: Response) => {
  return res.send("Delete");
};

export {
  getAllApointments,
  createAppointment,
  updateAppointment,
  getAppointmentById,
  deleteAppointment,
};
