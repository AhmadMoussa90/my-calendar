export const USER_LOGIN = `
query UserLogin($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    _id
  }
}
`;

export const COMPANIES = `
{
  companies {
    _id,
    name
  }
}
`;

export const COMPANY_USERS = `
query CompanyUsers($id: ID!) {
  companyUsers(id: $id) {
    _id,
    name
  }
}
`;

export const COMPANY_ROOMS = `
query CompanyRooms($id: ID!) {
  companyRooms(id: $id) {
    _id,
    name
  }
}
`;

export const TIMESLOTS = `
{
  timeSlots {
    _id,
    startDate
  }
}
`;

export const COMPANY_CALENDAR = `
query CompanyCalendar($id: ID!) {
  companyCalendar(id: $id) {
    rooms {
      _id,
      name
    },
    timeSlots {
      _id,
      startDate
    },
    companyReservations {
      _id,
      user {
        _id,
        name
      },
      partner {
        _id,
        name
      },
      appointment {
        room {
          _id,
          name
        },
        timeSlot {
          _id,
          startDate
        }
      }
    }
  }
}
`;

export const COMPANY_TIMESLOT_AVAILABLE_PARTNERS = `
query CompanytimeSlotAvailablePartners($companyID: ID!, $timeSlotID: ID!) {
  companytimeSlotPartners(companyTsPartnersInput: {company: $companyID, timeSlot: $timeSlotID}) {
    _id,
    name
  }
}
`;

export const CREATE_RESERVATION = `
mutation CreateReservation($userID: ID!, $partnerID: ID!, $roomID: ID!, $timeSlotID: ID!) {
  createReservation(reservationInput: {user: $userID, partner: $partnerID, appointment: {room: $roomID, timeSlot: $timeSlotID}}) {
    user {
      name,
      company {
        name
      }
    },
    partner {
      name
    },
    appointment {
      _id,
      room {
        name,
        company {
          name
        }
      },
      timeSlot {
        startDate
      }
    }
  }
}
`;

export const DELETE_RESERVATION = `
mutation DeleteReservation($id: ID!, $userID: ID!) {
  deleteReservation(id: $id, userID: $userID)
}
`;
