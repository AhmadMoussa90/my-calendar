import { Appointment } from "./appointment";
import { Company } from "./company";
import { Partner } from "./partner";
import { Partnership } from "./partnership";
import { Reservation } from "./reservation";
import { Room } from "./room";
import { TimeSlot } from "./timeSlot";
import { User } from "./user";

export type CompanyRequest = {
  companyInput: Company;
};

export type IdRequest = {
  id: String;
};

export type PartnerRequest = {
  partnerInput: Partner;
};

export type RoomRequest = {
  roomInput: Room;
};

export type TimeSlotRequest = {
  timeSlotInput: TimeSlot;
};

export type UserRequest = {
  userInput: User;
};

export type PartnershipRequest = {
  partnershipInput: Partnership;
};

export type AppointmentRequest = {
  appointmentInput: Appointment;
};

export type ReservationRequest = {
  reservationInput: Reservation;
};

export type LoginRequest = {
  name: String;
  password: String;
};
