import { model, Schema, Types } from "mongoose";

export interface Room {
  _id?: String;
  name: String;
  company: Types.ObjectId;
}

const RoomSchema = new Schema<Room>({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

const RoomModel = model<Room>("Room", RoomSchema);

export default RoomModel;
