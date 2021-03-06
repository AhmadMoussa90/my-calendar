import { RoomResponse } from "../models/responses";
import RoomModel, { Room } from "../models/room";

export async function getRoomById(id: String): Promise<RoomResponse | null> {
  return RoomModel.findById(id).populate("company");
}

export async function getRoomByName(name: String): Promise<Room | null> {
  return RoomModel.findOne({ name });
}

export async function createRoom(
  name: String,
  company: String
): Promise<Room | null> {
  const room = new RoomModel({
    name,
    company,
  });
  return room.save();
}

export async function getAllRooms(): Promise<RoomResponse[]> {
  return RoomModel.find().populate("company");
}

export async function getCompanyRooms(
  companyID: String
): Promise<RoomResponse[]> {
  return RoomModel.find({ company: companyID }).populate("company");
}
