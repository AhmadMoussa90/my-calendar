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
