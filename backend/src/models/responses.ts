import { Company } from "./company";
import { User } from "./user";

export interface UserResponse extends Omit<User, "company" | "password"> {
  _id: string;
  company: Company;
}
