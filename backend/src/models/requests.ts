import { Company } from "./company";
import { Partner } from "./partner";
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