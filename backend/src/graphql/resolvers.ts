import express from "express";
import CompanyModel, { Company } from "../models/company";
import PartnerModel, { Partner } from "../models/partner";
import RoomModel, { Room } from "../models/room";
import TimeSlotModel, { TimeSlot } from "../models/timeSlot";
import UserModel, { User } from "../models/user";

type CompanyRequest = {
  companyInput: Company;
};

type PartnerRequest = {
  partnerInput: Partner;
};

type RoomRequest = {
  roomInput: Room;
};

type TimeSlotRequest = {
  timeSlotInput: TimeSlot;
};

type UserRequest = {
  userInput: User;
};

type ID = {
  id: String;
};

export default {
  createCompany: async function (
    { companyInput }: CompanyRequest,
    req: express.Request
  ) {
    const existingCompany = await CompanyModel.findOne({
      name: companyInput.name,
    });
    if (existingCompany) throw new Error("Company exists already!");

    const company = new CompanyModel({
      name: companyInput.name,
    });
    const createdCompany = await company.save();

    return { _id: createdCompany._id.toString(), name: createdCompany.name };
  },

  company: async function ({ id }: ID) {
    const company = await CompanyModel.findById(id);
    if (!company) throw new Error("No company found!");

    return {
      _id: company._id.toString(),
      name: company.name,
    };
  },

  createPartner: async function (
    { partnerInput }: PartnerRequest,
    req: express.Request
  ) {
    const existingPartner = await PartnerModel.findOne({
      name: partnerInput.name,
    });
    if (existingPartner) throw new Error("Partner exists already!");

    const partner = new PartnerModel({
      name: partnerInput.name,
    });
    const createdPartner = await partner.save();

    return { _id: createdPartner._id.toString(), name: createdPartner.name };
  },

  partner: async function ({ id }: ID) {
    const partner = await PartnerModel.findById(id);
    if (!partner) throw new Error("No partner found!");

    return {
      _id: partner._id.toString(),
      name: partner.name,
    };
  },

  createRoom: async function (
    { roomInput }: RoomRequest,
    req: express.Request
  ) {
    const existingRoom = await RoomModel.findOne({ name: roomInput.name });
    if (existingRoom) throw new Error("Room exists already!");

    const room = new RoomModel({
      name: roomInput.name,
    });
    const createdRoom = await room.save();

    return { _id: createdRoom._id.toString(), name: createdRoom.name };
  },

  room: async function ({ id }: ID) {
    const room = await RoomModel.findById(id);
    if (!room) throw new Error("No room found!");

    return {
      _id: room._id.toString(),
      name: room.name,
    };
  },

  createTimeSlot: async function (
    { timeSlotInput }: TimeSlotRequest,
    req: express.Request
  ) {
    const existingTimeSlot = await TimeSlotModel.findOne({
      startDate: timeSlotInput.startDate,
    });
    if (existingTimeSlot) throw new Error("Time slot exists already!");

    const timeSlot = new TimeSlotModel({
      startDate: timeSlotInput.startDate,
    });
    const createdTimeSlot = await timeSlot.save();

    return {
      _id: createdTimeSlot._id.toString(),
      startDate: createdTimeSlot.startDate,
    };
  },

  timeSlot: async function ({ id }: ID) {
    const timeSlot = await TimeSlotModel.findById(id);
    if (!timeSlot) throw new Error("No time slot found!");

    return {
      _id: timeSlot._id.toString(),
      startDate: timeSlot.startDate,
    };
  },

  createUser: async function ({ userInput }: UserRequest) {
    const company = await CompanyModel.findById(userInput.company);
    if (!company) throw new Error("Invalid company.");

    const user = new UserModel({
      name: userInput.name,
      password: userInput.password,
      company: userInput.company,
    });

    const createdUser = await user.save();

    return {
      _id: createdUser._id.toString(),
      name: createdUser.name,
      company: createdUser.company,
    };
  },

  user: async function ({ id }: ID) {
    const user = await UserModel.findById(id).populate("company");
    if (!user) throw new Error("No user found.");

    return {
      _id: user._id.toString(),
      name: user.name,
      company: user.company,
    };
  },
};
