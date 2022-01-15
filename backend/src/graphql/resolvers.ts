import * as CompanyLogic from "../logic/companyLogic";
import * as PartnerLogic from "../logic/partnerLogic";
import * as RoomLogic from "../logic/roomLogic";
import * as timeSlotLogic from "../logic/timeSlotLogic";
import * as UserLogic from "../logic/userLogic";
import { Company } from "../models/company";
import { Partner } from "../models/partner";
import * as Requests from "../models/requests";
import { Room } from "../models/room";
import { TimeSlot } from "../models/timeSlot";
import { UserResponse } from "../models/responses";

export default {
  createCompany: async function ({
    companyInput,
  }: Requests.CompanyRequest): Promise<Company> {
    const existingCompany = await CompanyLogic.getCompanyByName(
      companyInput.name
    );
    if (existingCompany) throw new Error("Company exists already!");
    const createdCompany = await CompanyLogic.createCompany(companyInput.name);

    return { _id: createdCompany!._id!.toString(), name: createdCompany!.name };
  },

  company: async function ({ id }: Requests.IdRequest): Promise<Company> {
    const company = await CompanyLogic.getCompanyById(id);
    if (!company) throw new Error("No company found!");

    return {
      _id: company._id!.toString(),
      name: company.name,
    };
  },

  createPartner: async function ({
    partnerInput,
  }: Requests.PartnerRequest): Promise<Partner> {
    const existingPartner = await PartnerLogic.getPartnerByName(
      partnerInput.name
    );
    if (existingPartner) throw new Error("Partner exists already!");
    const createdPartner = await PartnerLogic.createPartner(partnerInput.name);

    return { _id: createdPartner!._id!.toString(), name: createdPartner!.name };
  },

  partner: async function ({ id }: Requests.IdRequest): Promise<Partner> {
    const partner = await PartnerLogic.getPartnerById(id);
    if (!partner) throw new Error("No partner found!");

    return {
      _id: partner._id!.toString(),
      name: partner.name,
    };
  },

  createRoom: async function ({
    roomInput,
  }: Requests.RoomRequest): Promise<Room> {
    const existingRoom = await RoomLogic.getRoomByName(roomInput.name);
    if (existingRoom) throw new Error("Room exists already!");

    const createdRoom = await RoomLogic.createRoom(roomInput.name);

    return { _id: createdRoom!._id!.toString(), name: createdRoom!.name };
  },

  room: async function ({ id }: Requests.IdRequest): Promise<Room> {
    const room = await RoomLogic.getRoomById(id);
    if (!room) throw new Error("No room found!");

    return {
      _id: room._id!.toString(),
      name: room.name,
    };
  },

  createTimeSlot: async function ({
    timeSlotInput,
  }: Requests.TimeSlotRequest): Promise<TimeSlot> {
    const existingTimeSlot = await timeSlotLogic.getTimeSlotByStartDate(
      timeSlotInput.startDate
    );
    if (existingTimeSlot) throw new Error("Time slot exists already!");
    const createdTimeSlot = await timeSlotLogic.createTimeSlot(
      timeSlotInput.startDate
    );

    return {
      _id: createdTimeSlot!._id!.toString(),
      startDate: createdTimeSlot!.startDate,
    };
  },

  timeSlot: async function ({ id }: Requests.IdRequest): Promise<TimeSlot> {
    const timeSlot = await timeSlotLogic.getTimeSlotById(id);
    if (!timeSlot) throw new Error("No time slot found!");

    return {
      _id: timeSlot!._id!.toString(),
      startDate: timeSlot.startDate,
    };
  },

  createUser: async function ({
    userInput,
  }: Requests.UserRequest): Promise<UserResponse> {
    const company = await CompanyLogic.getCompanyById(
      userInput.company.toString()
    );
    if (!company) throw new Error("Invalid company.");

    const createdUser = await UserLogic.createUser(
      userInput.name,
      userInput.password,
      userInput.company.toString()
    );

    return {
      _id: createdUser!._id!.toString(),
      name: createdUser!.name,
      company: company,
    };
  },

  user: async function ({ id }: Requests.IdRequest): Promise<UserResponse> {
    const user = (await UserLogic.getUserById(id)) as UserResponse;
    if (!user) throw new Error("No user found.");

    return {
      _id: user._id.toString(),
      name: user.name,
      company: user.company,
    };
  },
};
