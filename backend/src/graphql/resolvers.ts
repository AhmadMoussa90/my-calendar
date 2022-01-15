import express from "express";
import CompanyModel from "../models/company";
import { Company } from "../models/company";

type CompanyRequest = {
  companyInput: Company;
};

type ID = {
  id: String;
}

export default {
  createCompany: async function( { companyInput }: CompanyRequest, req:express.Request ) {
    const existingCompany = await CompanyModel.findOne({ name: companyInput.name });
    if (existingCompany) {
      const error = new Error('Company exists already!');
      throw error;
    }

    const company = new CompanyModel({
      name: companyInput.name,
    });
    const createdCompany = await company.save();

    return { _id: createdCompany._id.toString(), name: createdCompany.name };
  },

  company: async function({ id }: ID) {
    const company = await CompanyModel.findById(id);
    if (!company) {
      const error = new Error('No company found!');
      throw error;
    }
    return {
      _id: company._id.toString(),
      name: company.name
    };
  },
};
