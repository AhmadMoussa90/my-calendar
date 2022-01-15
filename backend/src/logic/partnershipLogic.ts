import { PartnershipResponse } from "../models/responses";
import PartnershipModel, { Partnership } from "../models/partnership";

export async function getPartnershipById(
  id: String
): Promise<PartnershipResponse | null> {
  return PartnershipModel.findById(id).populate("company").populate("partner");
}

export async function createPartnership(
  partner: String,
  company: String
): Promise<Partnership | null> {
  const partnership = new PartnershipModel({
    partner,
    company,
  });
  return partnership.save();
}
