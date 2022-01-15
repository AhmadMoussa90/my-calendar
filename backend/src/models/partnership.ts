import { model, Schema, Types } from "mongoose";

export interface Partnership {
  _id?: String;
  partner: Types.ObjectId;
  company: Types.ObjectId;
}

const PartnershipSchema = new Schema<Partnership>({
  partner: {
    type: Schema.Types.ObjectId,
    ref: "Partner",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

const PartnershipModel = model<Partnership>("Partnership", PartnershipSchema);

export default PartnershipModel;
