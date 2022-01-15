import { Company } from "./company";
import { Partner } from "./partner";
import { Partnership } from "./partnership";
import { Room } from "./room";
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
