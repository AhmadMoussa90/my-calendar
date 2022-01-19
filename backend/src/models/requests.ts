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
  reservationInput: ReservationInput;
};

export interface ReservationInput extends Omit<Reservation, "appointment"> {
  appointment: Appointment;
}

export type LoginRequest = {
  name: String;
  password: String;
};

export type CompanyTsPartnersResquest = {
  company: String;
  timeSlot: String;
};

export type CompanyTsPartnersInput = {
  companyTsPartnersInput: CompanyTsPartnersResquest;
};

export type DeleteReservationInput = {
  id: String;
  userID: String;
};
