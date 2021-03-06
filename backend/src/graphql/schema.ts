import { buildSchema } from "graphql";

export default buildSchema(`
    type Company {
      _id: ID!
      name: String!
    }

    type Partner {
      _id: ID!
      name: String!
    }

    type Room {
      _id: ID!
      name: String!
      company: Company!
    }

    type TimeSlot {
      _id: ID!
      startDate: String!
    }

    type User {
      _id: ID!
      name: String!
      company: Company!
    }

    type Partnership {
      _id: ID!
      partner: Partner!
      company: Company!
    }

    type Appointment {
      _id: ID!
      room: Room!
      timeSlot: TimeSlot!
    }

    type Reservation {
      _id: ID!
      user: User!
      partner: Partner!
      appointment: Appointment!
    }

    type AuthData {
      _id: ID!
    }

    type Calendar {
      rooms: [Room!]!
      timeSlots: [TimeSlot!]!
      companyReservations: [Reservation!]!
    }

    input CompanyInput {
        name: String!
    }

    input PartnerInput {
      name: String!
    }

    input RoomInput {
      name: String!
      company: ID!
    }

    input TimeSlotInput {
      startDate: String!
    }

    input UserInput {
      name: String!
      password: String!
      company: ID!
    }

    input PartnershipInput {
      partner: ID!
      company: ID!
    }

    input AppointmentInput {
      room: ID!
      timeSlot: ID!
    }

    input ReservationInput {
      user: ID!
      partner: ID!
      appointment: AppointmentInput!
    }

    input CompanyTsPartnersInput {
      company: ID!
      timeSlot: ID!
    }

    type RootQuery {
        company(id: ID!): Company!
        partner(id: ID!): Partner!
        room(id: ID!): Room!
        rooms: [Room!]!
        timeSlot(id: ID!): TimeSlot!
        timeSlots: [TimeSlot!]!
        user(id: ID!): User!
        partnership(id: ID!): Partnership!
        appointment(id: ID!): Appointment!
        reservation(id: ID!): Reservation!
        companies: [Company!]!
        companyUsers(id: ID!): [User!]!
        companyRooms(id: ID!): [Room!]!
        companyCalendar(id: ID!): Calendar!
        companytimeSlotPartners(companyTsPartnersInput: CompanyTsPartnersInput): [Partner!]!
        login(name: String!, password: String!): AuthData!
    }

    type RootMutation {
        createCompany(companyInput: CompanyInput): Company!
        createPartner(partnerInput: PartnerInput): Partner!
        createRoom(roomInput: RoomInput): Room!
        createTimeSlot(timeSlotInput: TimeSlotInput): TimeSlot!
        createUser(userInput: UserInput): User!
        createPartnership(partnershipInput: PartnershipInput): Partnership!
        createAppointment(appointmentInput: AppointmentInput): Appointment!
        createReservation(reservationInput: ReservationInput): Reservation!
        deleteReservation(id: ID!, userID: ID!): Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
