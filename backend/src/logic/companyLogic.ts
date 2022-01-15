import CompanyModel, { Company } from "../models/company";

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
