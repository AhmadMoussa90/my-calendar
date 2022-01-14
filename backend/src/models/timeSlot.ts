import { model, Schema } from "mongoose";

// TODO start_date's type should be date
export interface TimeSlot {
  start_date: string;
}

const TimeSlotSchema = new Schema<TimeSlot>({
  start_date: {
    type: String,
    required: true
  }
});

const TimeSlotModel = model<TimeSlot>("TimeSlot", TimeSlotSchema);

export default TimeSlotModel;
