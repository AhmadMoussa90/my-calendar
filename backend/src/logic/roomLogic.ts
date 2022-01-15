import RoomModel, { Room } from "../models/room";

export async function getRoomById(id: String): Promise<Room | null> {
  return RoomModel.findById(id);
}

export async function getRoomByName(name: String): Promise<Room | null> {
  return RoomModel.findOne({ name });
}

export async function createRoom(name: String): Promise<Room | null> {
  const room = new RoomModel({
    name,
  });
  return room.save();
}
