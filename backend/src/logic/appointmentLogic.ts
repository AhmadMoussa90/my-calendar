import { AppointmentResponse } from "../models/responses";
import AppointmentModel, { Appointment } from "../models/appointment";
import CompanyModel from "../models/company";

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
  const appointment = new AppointmentModel({
    room,
    timeSlot,
  });
  return appointment.save();
}
