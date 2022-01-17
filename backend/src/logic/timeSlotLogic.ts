import TimeSlotModel, { TimeSlot } from "../models/timeSlot";

export async function getTimeSlotById(id: String): Promise<TimeSlot | null> {
  return TimeSlotModel.findById(id);
}

export async function getTimeSlotByStartDate(
  startDate: String
): Promise<TimeSlot | null> {
  return TimeSlotModel.findOne({ startDate });
}

export async function createTimeSlot(
  startDate: String
): Promise<TimeSlot | null> {
  const timeSlot = new TimeSlotModel({
    startDate,
  });
  return timeSlot.save();
}

export async function getAllTimeSlots(): Promise<TimeSlot[]> {
  return TimeSlotModel.find();
}
