import { model, Schema, Types } from "mongoose";

export interface User {
  name: string;
  password: string;
  company: Types.ObjectId;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  }
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;

