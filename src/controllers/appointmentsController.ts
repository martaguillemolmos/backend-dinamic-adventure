import { Request, Response } from "express";
import { Users } from "../models/User";
import { Activity } from "../models/Activity";
import dayjs from "dayjs";
import { Appointment } from "../models/Appointment";

const disponibilityDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.body;
    const dateBody = dayjs(date);
    if (!dateBody.isValid()) {
      return res.status(400).json({
        success: false,
        message: "El formato de la fecha no es válido.",
      });
    }

    const appointments = await Appointment.find({
      where: { date: dateBody.toDate(), status_appointment: "approved" },
    });

    let appointmentsByActivity = [];

    for (const appointment of appointments) {
      const { id_activity, participants } = appointment;

      // Comprobamos si existe un objeto para esa id_activity
      const existingElement = appointmentsByActivity.find(
        (item) => item.id_activity === id_activity
      );

      if (existingElement) {
        // Si ya existe, incrementa incrementa el número total de participantes
        existingElement.allParticipants += participants;
      } else {
        // Si no existe, crea un nuevo elemento para esa id_activity
        appointmentsByActivity.push({
          id_activity,
          allParticipants: participants,
        });
      }
    }
    return res.json({
      success: true,
      data: appointmentsByActivity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "No se ha podido realizar la consulta",
    });
  }
};

const createAppointment = async (req: Request, res: Response) => {
  try {
    if (
      (req.token.role == "user",
      "admin",
      "super_admin" && req.token.is_active == true)
    ) {
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
                data: newAppointment,
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
              return res.json({
                message:
                  "No completamos el grupo mínimo, nos pondremos en contacto contigo si llegamos al mínimo.",
                data: newAppointment,
              });
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

const getAppointmentByUser = async (req: Request, res: Response) => {
  try {
    if (
      (req.token.role == "user",
      "admin",
      "super_admin" && req.token.is_active == true)
    ) {
      //Recuperar el id del usuario por su token
      const user = await Users.findOne({
        where: { id: req.token.id },
      });
      console.log(user, "user");

      if (!user) {
        return res.json("El usuario no existe.");
      }

      const appointments = await Appointment.find({
        where: { id_user: user.id },
        relations: ["activity"],
      });

      console.log(appointments, "son todas las citas del usuario");

      if (appointments.length === 0) {
        return res.json("Actualmente no existen citas para este usuario.");
      }

      const result = appointments.map(
        ({ id_activity, activity, ...appointment }) => ({
          ...appointment,
          activity_name: activity.title,
        })
      );

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

const getAppointmentsByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.body;

    const dateBody = dayjs(date);

    if (!dateBody.isValid()) {
      return res.status(400).json({
        success: false,
        message:
          "El formato de la fecha no es válido. Utiliza el formato ISO 8601.",
      });
    }

    const appointments = await Appointment.find({
      where: { date: dateBody.toDate() },
      relations: ["activity"],
    });
    console.log(appointments, "soy apponitmflmt");
    if (appointments.length === 0) {
      return res.json({
        success: true,
        message: `Actualmente no existen citas para el día: ${dateBody.toISOString()}.`,
      });
    }

    const result = appointments.map(
      ({ id_activity, activity, ...appointment }) => ({
        ...appointment,
        activity_name: activity.title,
      })
    );

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "No se ha podido realizar la consulta",
    });
  }
};

const getAllApointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({
      relations: ["activity"],
    });

    if (appointments.length == 0) {
      return res.json({
        success: true,
        message: `Actualmente, no hay citas registradas.`,
      });
    } else {

      const result = appointments.map(
        ({ id_activity, activity, ...appointment }) => ({
          ...appointment,
          activity_name: activity.title,
        })
      );

      return res.json({
        succes: true,
        message: `Todas las citas:`,
        data: result,
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

const updateAppointment = async (req: Request, res: Response) => {
  const appointmentId = req.body.id;
  const existAppointment = await Appointment.findOneBy({
    id: appointmentId,
  });
  console.log("soy existAppot", existAppointment);

  if (!existAppointment) {
    return res.json("El id no existe");
  }

  const dateAppointment = dayjs(existAppointment.date);
  const dateNow = dayjs();
  console.log("datenow", dateNow);
  console.log(dateAppointment, "soy la date de appointment");
  // Calcular la diferencia en días
  const diferenciaDias = dateAppointment.diff(dateNow, "days");
  console.log(diferenciaDias, "soy la diferencia");

  if (
    existAppointment.status_appointment == "pending" ||
    (existAppointment.status_appointment == "approved" && diferenciaDias >= 10)
  ) {
    if (req.token.role !== "super_admin" && req.token.is_active == true) {
      const idToken = req.token.id;

      if (existAppointment.id_user !== idToken) {
        return res.status(403).json({
          success: false,
          message: "No tienes permisos para actualizar esta reserva",
        });
      }
    }

    //Recuperamos la información que van a modificar
    const { participants, date, status_appointment } = req.body;

    if (participants && date) {
      let updatedAppointment;

      const existingAppointments = await Appointment.find({
        where: {
          id_activity: existAppointment.id_activity,
          date,
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

        console.log(participantsArray);
        const totalParticipants = sumParticipants(participantsArray);
        console.log(totalParticipants, "soy el total");

        let participantsBooking;
        //Comprobamos si contamos con las plazas que nos solicitan
        if (existAppointment.participants > 4) {
          const changeParticipants =
          participants - existAppointment.participants;
          console.log("la diferencia entre total y nuevo", changeParticipants);
          participantsBooking = totalParticipants + changeParticipants;
          console.log(participantsBooking, "soy todos los aprticia");
          console.log("1");
        } else {
          participantsBooking = participants;
          console.log("2");
        }

        console.log(participantsBooking, "quien soy");
        if (participantsBooking >= 0 && participantsBooking <= 12) {
          if (participantsBooking >= 4 && participantsBooking <= 12) {
            updatedAppointment = await Appointment.update(
              {
                id: appointmentId,
              },
              {
                status_appointment: "approved",
                participants,
                date,
              }
            );
            if (updatedAppointment) {
              return res.json({
                success: true,
                message: "se ha modificado el newAppointment",
                data: updatedAppointment,
              });
            } else {
              return res.json("No se ha creado la cita.");
            }
          } else {
            if (participantsBooking <= 4) {
              updatedAppointment = await Appointment.update(
                {
                  id: appointmentId,
                },
                {
                  status_appointment: "pending",
                  participants,
                  date,
                }
              );
              return res.json({
                success: true,
                message:
                  "No completamos el grupo mínimo, nos pondremos en contacto contigo si llegamos al mínimo.",
                data: updatedAppointment,
              });
            }
          }
        } else {
          return res.json(
            `No hay ${participants} plazas disponibles para esa fecha.`
          );
        }
      }

      return res.json({
        success: true,
        message: "Actualizado",
        data: updatedAppointment,
      });
    } else if (status_appointment) {
      let updatedAppointment = await Appointment.update(
        {
          id: appointmentId,
        },
        {
          status_appointment,
        }
      );
      return res.json({
        success: true,
        message: "Se ha cancelado la cita",
        data: updatedAppointment,
      });
    }
    return null;
  } else {
    return res.json("No puedes modificar la reserva");
  }
};

export {
  getAllApointments,
  createAppointment,
  updateAppointment,
  getAppointmentByUser,
  getAppointmentsByDate,
  disponibilityDate,
};
