import { ReservationResponse } from "../models/responses";
import ReservationModel, { Reservation } from "../models/reservation";
import CompanyModel from "../models/company";
import TimeSlotModel from "../models/timeSlot";
import RoomModel from "../models/room";
import UserModel from "../models/user";

export async function getReservationById(
  id: String
): Promise<ReservationResponse | null> {
  return ReservationModel.findById(id)
    .populate({
      path: "user",
      populate: {
        path: "company",
        model: CompanyModel,
      },
    })
    .populate("partner")
    .populate({
      path: "appointment",
      populate: {
        path: "timeSlot",
        model: TimeSlotModel,
      },
    })
    .populate({
      path: "appointment",
      populate: {
        path: "room",
        model: RoomModel,
        populate: {
          path: "company",
          model: CompanyModel,
        },
      },
    });
}

export async function createReservation(
  user: String,
  partner: String,
  appointment: String
): Promise<Reservation | null> {
  const reservation = new ReservationModel({
    user,
    partner,
    appointment,
  });
  return reservation.save();
}
