import AppointmentModel from "../models/appointment";
import CompanyModel, { Company } from "../models/company";
import PartnerModel, { Partner } from "../models/partner";
import PartnershipModel from "../models/partnership";
import ReservationModel from "../models/reservation";
import TimeSlotModel from "../models/timeSlot";

export async function getCompanyById(id: String): Promise<Company | null> {
  return CompanyModel.findById(id);
}

export async function getCompanyByName(name: String): Promise<Company | null> {
  return CompanyModel.findOne({ name });
}

export async function createCompany(name: String): Promise<Company | null> {
  const company = new CompanyModel({
    name,
  });
  return company.save();
}

export async function getAllCompanies(): Promise<Company[]> {
  return CompanyModel.find();
}

export async function getTsAvailablePartners(
  companyID: String,
  timeSlotID: String
): Promise<Partner[]> {
  const timeSlotAppointments = await AppointmentModel.find(
    {
      timeSlot: timeSlotID,
    },
    "_id"
  );

  const timeSlotsPartners = (
    await ReservationModel.find({
      appointment: {
        $in: timeSlotAppointments,
      },
    }).populate("partner", "_id")
  ).map((reservation) => reservation.partner._id.toJSON());

  const companyPartners = (
    await PartnershipModel.find({ company: companyID }).populate("partner")
  ).map((partnership) => partnership.partner);

  return companyPartners.filter(
    (p) => !timeSlotsPartners.includes(p._id.toJSON())
  ) as unknown as Partner[];
}
