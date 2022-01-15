import { model, Schema } from "mongoose";

export interface Room {
  _id?: String;
  name: String;
}

const RoomSchema = new Schema<Room>({
  name: {
    type: String,
    required: true,
  },
});

const RoomModel = model<Room>("Room", RoomSchema);

export default RoomModel;
