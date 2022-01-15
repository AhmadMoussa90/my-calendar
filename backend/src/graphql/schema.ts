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

    type RootQuery {
        company(id: ID!): Company!
        partner(id: ID!): Partner!
        room(id: ID!): Room!
        timeSlot(id: ID!): TimeSlot!
        user(id: ID!): User!
        partnership(id: ID!): Partnership!
        appointment(id: ID!): Appointment!
    }

    type RootMutation {
        createCompany(companyInput: CompanyInput): Company!
        createPartner(partnerInput: PartnerInput): Partner!
        createRoom(roomInput: RoomInput): Room!
        createTimeSlot(timeSlotInput: TimeSlotInput): TimeSlot!
        createUser(userInput: UserInput): User!
        createPartnership(partnershipInput: PartnershipInput): Partnership!
        createAppointment(appointmentInput: AppointmentInput): Appointment!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
