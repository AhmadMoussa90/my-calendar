export interface Company {
  _id: String;
  name: String;
}

export interface User {
  _id: String;
  name: String;
}

export interface Room {
  _id: String;
  name: String;
  company: Company;
}

export interface TimeSlot {
  _id: String;
  startDate: String;
}

export interface Partner {
  _id: String;
  name: String;
}

export interface Appointment {
  _id: String;
  room: Room;
  timeSlot: TimeSlot;
  available: Boolean;
}

export interface Reservation {
  _id: String;
  user: User;
  partner: Partner;
  appointment: Appointment;
}

export type Calendar = {
  rooms: [Room];
  timeSlots: [TimeSlot];
  companyReservations: [Reservation];
};

export type CurrentSlot = {
  timeSlot: TimeSlot;
  room: Room;
  reservation?: Reservation | null;
};
