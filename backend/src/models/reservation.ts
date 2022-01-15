import { model, Schema, Types } from "mongoose";

export interface Reservation {
  _id?: String;
  user: Types.ObjectId;
  partner: Types.ObjectId;
  appointment: Types.ObjectId;
}

const ReservationSchema = new Schema<Reservation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  partner: {
    type: Schema.Types.ObjectId,
    ref: "Partner",
  },
  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  },
});

const ReservationModel = model<Reservation>("Reservation", ReservationSchema);

export default ReservationModel;
