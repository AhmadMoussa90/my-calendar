import { Company } from "./company";
import { User } from "./user";

// TODO dublicated code
export interface UserResponse extends Omit<User, "company" | "password"> {
  _id: string;
  company: Company;
}

export interface RoomResponse extends Omit<User, "company" | "password"> {
  _id: string;
  company: Company;
}
