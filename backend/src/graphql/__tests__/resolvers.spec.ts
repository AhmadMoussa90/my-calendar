import Resolvers from "../resolvers";
import * as CompanyLogic from "../../logic/companyLogic";
import * as UserLogic from "../../logic/userLogic";
import { Company } from "../../models/company";
import { COMPANY_REQUEST, USER_REQUEST } from "./moked/requestsMocked";

const FACK_ID = "-1";

let getCompanyById: jest.SpyInstance | undefined;
let getCompanyByName: jest.SpyInstance | undefined;
let getUserById: jest.SpyInstance | undefined;

afterAll(() => {
  jest.resetAllMocks();
});

describe("Resolvers", () => {
  describe("Company resolvers", () => {
    beforeAll(() => {
      getCompanyById = jest
        .spyOn(CompanyLogic, "getCompanyById")
        .mockImplementation(() => {
          return Promise.resolve(null);
        });

      getCompanyByName = jest
        .spyOn(CompanyLogic, "getCompanyByName")
        .mockImplementation(() => {
          return Promise.resolve({} as Company);
        });
    });

    it("[unit] createCompany() should reject when company already exists", async () => {
      expect(Resolvers.createCompany(COMPANY_REQUEST)).rejects.toThrow(
        "Company exists already!"
      );
    });
    it("[unit] company() should reject when no company found", async () => {
      expect(Resolvers.company({ id: FACK_ID })).rejects.toThrow(
        "No company found!"
      );
    });
  });

  describe("User resolvers", () => {
    beforeAll(() => {
      getCompanyById = jest
        .spyOn(CompanyLogic, "getCompanyById")
        .mockImplementation(() => {
          return Promise.resolve(null);
        });

      getUserById = jest
        .spyOn(UserLogic, "getUserById")
        .mockImplementation(() => {
          return Promise.resolve(null);
        });
    });
    it("[unit] createUser() should reject if no company", () => {
      expect(Resolvers.createUser(USER_REQUEST)).rejects.toThrow(
        "Invalid company."
      );
    });

    it("[unit] user() should reject when no user found", () => {
      expect(Resolvers.user({ id: FACK_ID })).rejects.toThrow("No user found.");
    });
  });
});
