import { Types } from "mongoose";
import * as Requests from "../../../models/requests";

export const COMPANY_REQUEST: Requests.CompanyRequest = {
  companyInput: {
    name: "",
  },
};

export const USER_REQUEST: Requests.UserRequest = {
  userInput: {
    name: "",
    password: "",
    company: new Types.ObjectId(),
  },
};
