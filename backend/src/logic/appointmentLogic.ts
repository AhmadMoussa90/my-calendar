import { AppointmentResponse } from "../models/responses";
import AppointmentModel, { Appointment } from "../models/appointment";
import CompanyModel from "../models/company";
import ReservationModel from "../models/reservation";

export async function getAppointmentById(
  id: String
): Promise<AppointmentResponse | null> {
  return AppointmentModel.findById(id)
    .populate("timeSlot")
    .populate({
      path: "room",
      populate: {
        path: "company",
        model: CompanyModel,
      },
    });
}

export async function createAppointment(
  room: String,
  timeSlot: String
): Promise<Appointment | null> {
  const existingAppointment = await AppointmentModel.find({
    room: room,
    timeSlot: timeSlot,
  });

  if (existingAppointment.length > 0) {
    const exsitingReservation = await ReservationModel.findOne({
      appointment: existingAppointment[0],
    });

    if (exsitingReservation) throw new Error("Appointment is reserved !");

    return existingAppointment[0];
  }

  const appointment = new AppointmentModel({
    room,
    timeSlot,
  });

  return appointment.save();
}

export async function deleteAppointment(id: String): Promise<Boolean> {
  await AppointmentModel.findByIdAndRemove(id);
  return true;
}
