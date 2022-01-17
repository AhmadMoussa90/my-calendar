import { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import CompanyList from "./components/companies/CompanyList";
import MainNavigation from "./components/shared/Navigation/MainNavigation";
import UserList from "./components/users/UserList";
import { Company, User } from "./models";
import { fetchData } from "./utils/intercall";
import { COMPANIES, COMPANY_USERS, USER_LOGIN } from "./utils/queries";
import Calendar from "./components/Calendar/Calendar";

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyID, setCompanyID] = useState<String | null>();
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [isAuth, setIsAuth] = useState<Boolean>(false);
  const [warningMessage, setWarningMessage] = useState<String | null>(null);

  const onSelectCompanyHandler = (id: String | null) => {
    setCompanyID(id);
  };

  const onSelectUserHandler = (id: String) =>
    setUser(users.filter((user) => user._id === id)[0]);

  const returnBackHandler = () => {
    setUsers([]);
    setCompanyID(null);
    setUser({} as User);
  };

  const logInHandler = async (password: String) => {
    setWarningMessage(null);

    const graphqlQuery = {
      query: USER_LOGIN,
      variables: {
        name: user!.name,
        password: password,
      },
    };

    const resData = await fetchData(graphqlQuery);
    if (resData.errors) {
      if (resData.errors[0].message === "Incorrect Password") {
        setWarningMessage("Incorrect Password!");
        return;
      }
      throw new Error("User authentication failed!");
    }
    setIsAuth(true);
  };

  const loadCompanies = async () => {
    const graphqlQuery = {
      query: COMPANIES,
    };

    const resData = await fetchData(graphqlQuery);
    if (resData.errors) throw new Error("Fetching companies failed!");
    setCompanies(resData.data.companies);
  };

  const loadCompanyUsers = async () => {
    const graphqlQuery = {
      query: COMPANY_USERS,
      variables: {
        id: companyID,
      },
    };

    const resData = await fetchData(graphqlQuery);
    if (resData.errors) throw new Error("Fetching users failed!");
    setUsers(resData.data.companyUsers);
  };

  // company not selected
  if (companies.length === 0) loadCompanies();

  // company selected
  if (companyID && users.length === 0) loadCompanyUsers();

  return (
    <Fragment>
      <div className="container">
        <MainNavigation username={user?.name} />
        <div className="row">
          <div className="col">
            <main>
              {!isAuth && !companyID && (
                <CompanyList
                  items={companies}
                  onSelectCompany={onSelectCompanyHandler}
                />
              )}
              {!isAuth && users.length > 0 && (
                <UserList
                  items={users}
                  warningMessage={warningMessage}
                  logIn={logInHandler}
                  onSelectUser={onSelectUserHandler}
                  returnBackHandler={returnBackHandler}
                />
              )}
              {isAuth && <Calendar />}
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
