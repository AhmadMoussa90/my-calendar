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

    input CompanyInput {
        name: String!
    }

    input PartnerInput {
      name: String!
    }

    input RoomInput {
      name: String!
    }

    input TimeSlotInput {
      startDate: String!
    }

    input UserInput {
      name: String!
      password: String!
      company: ID!
    }

    type RootQuery {
        company(id: ID!): Company!
        partner(id: ID!): Partner!
        room(id: ID!): Room!
        timeSlot(id: ID!): TimeSlot!
        user(id: ID!): User!
    }

    type RootMutation {
        createCompany(companyInput: CompanyInput): Company!
        createPartner(partnerInput: PartnerInput): Partner!
        createRoom(roomInput: RoomInput): Room!
        createTimeSlot(timeSlotInput: TimeSlotInput): TimeSlot!
        createUser(userInput: UserInput): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);