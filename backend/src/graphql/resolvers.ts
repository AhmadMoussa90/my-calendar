import * as CompanyLogic from "../logic/companyLogic";
import * as PartnerLogic from "../logic/partnerLogic";
import * as RoomLogic from "../logic/roomLogic";
import * as TimeSlotLogic from "../logic/timeSlotLogic";
import * as UserLogic from "../logic/userLogic";
import * as PartnershipLogic from "../logic/partnershipLogic";
import * as AppointmentLogic from "../logic/appointmentLogic";
import * as ReservationLogic from "../logic/reservationLogic";
import { Company } from "../models/company";
import { Partner } from "../models/partner";
import * as Requests from "../models/requests";
import { TimeSlot } from "../models/timeSlot";
import {
  PartnershipResponse,
  RoomResponse,
  UserResponse,
  AppointmentResponse,
  ReservationResponse,
  LoginResponse,
  CalendarResponse,
} from "../models/responses";
import { User } from "../models/user";
import { Room } from "../models/room";

// TODO dublicated code
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
  }: Requests.RoomRequest): Promise<RoomResponse> {
    const company = await CompanyLogic.getCompanyById(
      roomInput.company.toString()
    );
    if (!company) throw new Error("Invalid company.");

    const existingRoom = await RoomLogic.getRoomByName(roomInput.name);
    if (existingRoom) throw new Error("Room exists already!");

    const createdRoom = await RoomLogic.createRoom(
      roomInput.name,
      roomInput.company.toString()
    );

    return {
      _id: createdRoom!._id!.toString(),
      name: createdRoom!.name,
      company: company,
    };
  },

  room: async function ({ id }: Requests.IdRequest): Promise<RoomResponse> {
    const room = (await RoomLogic.getRoomById(id)) as UserResponse;
    if (!room) throw new Error("No room found!");

    return {
      _id: room._id!.toString(),
      name: room.name,
      company: room.company,
    };
  },

  rooms: async function (): Promise<RoomResponse[]> {
    return RoomLogic.getAllRooms();
  },

  createTimeSlot: async function ({
    timeSlotInput,
  }: Requests.TimeSlotRequest): Promise<TimeSlot> {
    const existingTimeSlot = await TimeSlotLogic.getTimeSlotByStartDate(
      timeSlotInput.startDate
    );
    if (existingTimeSlot) throw new Error("Time slot exists already!");
    const createdTimeSlot = await TimeSlotLogic.createTimeSlot(
      timeSlotInput.startDate
    );

    return {
      _id: createdTimeSlot!._id!.toString(),
      startDate: createdTimeSlot!.startDate,
    };
  },

  timeSlot: async function ({ id }: Requests.IdRequest): Promise<TimeSlot> {
    const timeSlot = await TimeSlotLogic.getTimeSlotById(id);
    if (!timeSlot) throw new Error("No time slot found!");

    return {
      _id: timeSlot!._id!.toString(),
      startDate: timeSlot.startDate,
    };
  },

  timeSlots: async function (): Promise<TimeSlot[]> {
    return TimeSlotLogic.getAllTimeSlots();
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

  createPartnership: async function ({
    partnershipInput,
  }: Requests.PartnershipRequest): Promise<PartnershipResponse> {
    const company = await CompanyLogic.getCompanyById(
      partnershipInput.company.toString()
    );
    if (!company) throw new Error("Invalid company.");

    const partner = await PartnerLogic.getPartnerById(
      partnershipInput.partner.toString()
    );
    if (!partner) throw new Error("Invalid partner.");

    const createdPartnership = await PartnershipLogic.createPartnership(
      partnershipInput.partner.toString(),
      partnershipInput.company.toString()
    );

    return {
      _id: createdPartnership!._id!.toString(),
      partner: partner,
      company: company,
    };
  },

  partnership: async function ({
    id,
  }: Requests.IdRequest): Promise<PartnershipResponse> {
    const partnership = (await PartnershipLogic.getPartnershipById(
      id
    )) as PartnershipResponse;
    if (!partnership) throw new Error("No partnership found.");

    return {
      _id: partnership._id.toString(),
      partner: partnership.partner,
      company: partnership.company,
    };
  },

  createAppointment: async function ({
    appointmentInput,
  }: Requests.AppointmentRequest): Promise<AppointmentResponse> {
    const room = await RoomLogic.getRoomById(appointmentInput.room.toString());
    if (!room) throw new Error("Invalid room.");

    const timeSlot = await TimeSlotLogic.getTimeSlotById(
      appointmentInput.timeSlot.toString()
    );
    if (!timeSlot) throw new Error("Invalid timeSlot.");

    const createdAppointment = await AppointmentLogic.createAppointment(
      appointmentInput.room.toString(),
      appointmentInput.timeSlot.toString()
    );

    return {
      _id: createdAppointment!._id!.toString(),
      room: room,
      timeSlot: timeSlot,
    };
  },

  appointment: async function ({
    id,
  }: Requests.IdRequest): Promise<AppointmentResponse> {
    const appointment = (await AppointmentLogic.getAppointmentById(
      id
    )) as AppointmentResponse;
    if (!appointment) throw new Error("No appointment found.");

    return {
      _id: appointment._id.toString(),
      room: appointment.room,
      timeSlot: appointment.timeSlot,
    };
  },

  createReservation: async function ({
    reservationInput,
  }: Requests.ReservationRequest): Promise<ReservationResponse> {
    const user = await UserLogic.getUserById(reservationInput.user.toString());
    if (!user) throw new Error("Invalid user.");

    const partner = await PartnerLogic.getPartnerById(
      reservationInput.partner.toString()
    );
    if (!partner) throw new Error("Invalid partner.");

    const appointment = await AppointmentLogic.getAppointmentById(
      reservationInput.appointment.toString()
    );
    if (!appointment) throw new Error("Invalid appointment.");

    const createdReservation = await ReservationLogic.createReservation(
      reservationInput.user.toString(),
      reservationInput.partner.toString(),
      reservationInput.appointment.toString()
    );

    return {
      _id: createdReservation!._id!.toString(),
      user: user,
      partner: partner,
      appointment: appointment,
    };
  },

  reservation: async function ({
    id,
  }: Requests.IdRequest): Promise<ReservationResponse> {
    const reservation = (await ReservationLogic.getReservationById(
      id
    )) as ReservationResponse;
    if (!reservation) throw new Error("No reservation found.");

    return {
      _id: reservation._id.toString(),
      user: reservation.user,
      partner: reservation.partner,
      appointment: reservation.appointment,
    };
  },

  companies: async function (): Promise<Company[]> {
    return CompanyLogic.getAllCompanies();
  },

  companyUsers: async function ({ id }: Requests.IdRequest): Promise<User[]> {
    return UserLogic.getCompanyUsers(id);
  },

  companyRooms: async function ({
    id,
  }: Requests.IdRequest): Promise<RoomResponse[]> {
    return RoomLogic.getCompanyRooms(id);
  },

  login: async function ({
    name,
    password,
  }: Requests.LoginRequest): Promise<LoginResponse> {
    const user = await UserLogic.authenticate(name, password);

    return {
      _id: user._id!.toString(),
    };
  },

  companyCalendar: async function ({
    id,
  }: Requests.IdRequest): Promise<CalendarResponse> {
    const rooms = await RoomLogic.getCompanyRooms(id);
    const timeSlots = await TimeSlotLogic.getAllTimeSlots();
    const reservations = await ReservationLogic.getCompanyReservations(id);

    return {
      rooms,
      timeSlots,
      companyReservations: reservations,
    };
  },
};
