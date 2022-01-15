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
