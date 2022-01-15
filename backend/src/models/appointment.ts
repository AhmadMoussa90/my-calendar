import { model, Schema, Types } from "mongoose";

export interface Appointment {
  _id?: String;
  isAvailable?: Boolean;
  room: Types.ObjectId;
  timeSlot: Types.ObjectId;
}

const AppointmentSchema = new Schema<Appointment>({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  timeSlot: {
    type: Schema.Types.ObjectId,
    ref: "TimeSlot",
  },
});

const AppointmentModel = model<Appointment>("Appointment", AppointmentSchema);

export default AppointmentModel;
