import { Request, Response } from "express";
import { Users } from "../models/User";
import { Activity } from "../models/Activity";
import dayjs from "dayjs";
import { Appointment } from "../models/Appointment";

const createAppointment = async (req: Request, res: Response) => {
  try {
    if ((req.token.role == "user", "admin", "super_admin" && req.token.is_active == true)) {
      const user = await Users.findOne({
        where: { id: req.token.id },
      });

      if (!user) {
        return res.json("El usuario no existe.");
      }

      const { activity, participants, date_activity, accept_requirements } =
        req.body;

      const existActivity = await Activity.findOne({
        where: { id: activity },
      });

      if (!existActivity) {
        return res.json("La actividad no existe.");
      }

      const dateBody = dayjs(date_activity, "AAAA-MM-DDTHH:mm:ss SSS [Z] A");
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
        function sumParticipants(b: number[]) {
          let a = 0;
          for (let i = 0; i < b.length; i++) {
            a += b[i];
          }
          return a;
        }

        const participantsArray = existingAppointments.map(
          (appointment) => appointment.participants
        );

        const totalParticipants = sumParticipants(participantsArray);
        const participantsBooking = totalParticipants + participants;

        if (participantsBooking >= 0 && participantsBooking <= 12) {
          if (participantsBooking >= 4 && participantsBooking <= 12) {
            const newAppointment = await Appointment.create({
              id_user: req.token.id,
              id_activity: activity,
              participants,
              price: existActivity.price,
              status_appointment: "approved",
              date: date_activity,
            }).save();
            if (newAppointment) {
              return res.json({
                message: "se ha creado el newAppointment",
              data: newAppointment
            });
            }
            return res.json("No se ha creado la cita.");
          } else {
            if (participants <= 4) {
              const newAppointment = await Appointment.create({
                id_user: req.token.id,
                id_activity: activity,
                participants,
                price: existActivity.price,
                status_appointment: "pending",
                date: date_activity,
              }).save();
              return res.json ({
                message: "No completamos el grupo mínimo, nos pondremos en contacto contigo si llegamos al mínimo.",
                data: newAppointment,
              })
          
            }
          }
        } else {
          return res.json(
            `No hay ${participants} plazas disponibles para esa fecha.`
          );
        }
      }
    }
    return res.json("Usuario no autorizado.");
  } catch (error) {
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

const getAppointmentByUser = async (req: Request, res: Response) => {
  try {
    if ((req.token.role == "user", "admin", "super_admin" && req.token.is_active == true)) {
      //Recuperar el id del usuario por su token
      const user = await Users.findOne({
        where: { id: req.token.id },
    }
      );
      console.log(user, "user")

      if (!user) {
        return res.json("El usuario no existe.");
      }

      const appointments = await Appointment.find({
        where: { id_user: user.id},
        relations: ["activity"]
      });

      console.log(appointments, "son todas las citas del usuario")

      if (appointments.length === 0) {
        return res.json("Actualmente no existen citas para este usuario.");
      }

      const result = appointments.map(({id_activity,activity, ...appointment }) => ({
        ...appointment,
        activity_name: activity.title,
      }));

      return res.json(result);
    } else {
      return res.json("Usuario no autorizado.");
    }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha podido realizar la consulta",
      error: error,
    });
  }
};

const getApointmentsByDate = async(req: Request, res: Response) => {
  try {

      const dateBody = req.body.date;

      const appointments = await Appointment.find({
        where: { date: dateBody},
        relations: ["activity"]
      });

      console.log(appointments, "son todas las en esa fecha")

      if (appointments.length === 0) {
        return res.json(`Actualmente no existen citas para el día: ${dateBody}.`);
      }

      const result = appointments.map(({id_activity,activity, ...appointment }) => ({
        ...appointment,
        activity_name: activity.title,
      }));

      return res.json(result);
    
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha podido realizar la consulta",
      error: error,
    });
  }
};

const getAllApointments = async(req: Request, res: Response) => {
  try {
    // Recuperamos a todos los usuarios
    const appointments = await Appointment.find();
    // Comprobamos si hay usuarios registrados.
    if (appointments.length == 0) {
      return res.json({
        success: true,
        message: `Actualmente, no hay citas registradas.`,
      });
    } else {
      return res.json({
        succes: true,
        message: `Todas las citas:`,
        data: appointments,
      });
    }
  } catch (error) {
    return res.json({
      succes: false,
      message: "No hemos podido recuperar las citas",
      error: error,
    });
  }
};

const deleteAppointment = (req: Request, res: Response) => {
  return res.send("Delete");
};

export {
  getAllApointments,
  createAppointment,
  updateAppointment,
  getAppointmentByUser,
  deleteAppointment, getApointmentsByDate
};
