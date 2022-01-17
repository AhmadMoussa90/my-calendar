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
