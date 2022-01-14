import { model, Schema } from "mongoose";

export interface Company {
  name: string;
}

const CompanySchema = new Schema<Company>({
  name: {
    type: String,
    required: true
  }
});

const CompanyModel = model<Company>("Company", CompanySchema);

export default CompanyModel;

