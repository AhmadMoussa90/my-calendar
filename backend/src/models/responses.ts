import { Appointment } from "./appointment";
import { Company } from "./company";
import { Partner } from "./partner";
import { Partnership } from "./partnership";
import { Reservation } from "./reservation";
import { Room } from "./room";
import { TimeSlot } from "./timeSlot";
import { User } from "./user";

// TODO dublicated code
export interface UserResponse extends Omit<User, "company" | "password"> {
  _id: string;
  company: Company;
}

export interface RoomResponse extends Omit<Room, "company"> {
  _id: string;
  company: Company;
}

export interface PartnershipResponse
  extends Omit<Partnership, "company" | "partner"> {
  _id: string;
  partner: Partner;
  company: Company;
}

export interface AppointmentResponse
  extends Omit<Appointment, "room" | "timeSlot"> {
  _id: string;
  room: RoomResponse;
  timeSlot: TimeSlot;
}

export interface ReservationResponse
  extends Omit<Reservation, "user" | "partner" | "appointment"> {
  _id: string;
  user: UserResponse;
  partner: Partner;
  appointment: AppointmentResponse;
}
