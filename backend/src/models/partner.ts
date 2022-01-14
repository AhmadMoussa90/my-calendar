import { model, Schema } from "mongoose";

export interface Partner {
  name: string;
}

const PartnerSchema = new Schema<Partner>({
  name: {
    type: String,
    required: true
  }
});

const PartnerModel = model<Partner>("Partner", PartnerSchema);

export default PartnerModel;
