import { model, Schema } from "mongoose";

export interface Company {
  _id?: String;
  name: String;
}

const CompanySchema = new Schema<Company>({
  name: {
    type: String,
    required: true,
  },
});

const CompanyModel = model<Company>("Company", CompanySchema);

export default CompanyModel;
