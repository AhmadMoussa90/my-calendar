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
