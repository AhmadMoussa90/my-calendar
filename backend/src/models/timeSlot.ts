import { model, Schema } from "mongoose";

// TODO start_date's type should be date
export interface TimeSlot {
  startDate: string;
}

const TimeSlotSchema = new Schema<TimeSlot>({
  startDate: {
    type: String,
    required: true
  }
});

const TimeSlotModel = model<TimeSlot>("TimeSlot", TimeSlotSchema);

export default TimeSlotModel;
