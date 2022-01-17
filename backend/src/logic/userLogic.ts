import { UserResponse } from "../models/responses";
import UserModel, { User } from "../models/user";

export async function getUserById(id: String): Promise<UserResponse | null> {
  return UserModel.findById(id).populate("company");
}

export async function createUser(
  name: String,
  password: String,
  company: String
): Promise<User | null> {
  const user = new UserModel({
    name,
    password,
    company,
  });
  return user.save();
}
export async function getCompanyUsers(companyID: String) {
  return UserModel.find({ company: companyID });
}

export async function authenticate(
  name: String,
  password: String
): Promise<User> {
  const user = await UserModel.findOne({ name: name });
  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Incorrect Error");

  return user;
}
