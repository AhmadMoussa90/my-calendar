import PartnerModel, { Partner } from "../models/partner";

export async function getPartnerById(id: String): Promise<Partner | null> {
  return PartnerModel.findById(id);
}

export async function getPartnerByName(name: String): Promise<Partner | null> {
  return PartnerModel.findOne({ name });
}

export async function createPartner(name: String): Promise<Partner | null> {
  const partner = new PartnerModel({
    name,
  });
  return partner.save();
}
