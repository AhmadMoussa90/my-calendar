import { FormLabel } from "@mui/material";

import { Company } from "../../models";
import Card from "../shared/Card/Card";
import CompanyItem from "./CompanyItem";

const CompanyList: React.FC<{
  items: Company[];
  onSelectCompany: (_id: String) => void;
}> = (props) => {
  if (!props.items || props.items.length === 0) {
    return (
      <div className="row">
        <div className="col">
          <h1>No company</h1>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <div className="row">
        <div className="col">
          <FormLabel component="legend">Who is your company ?</FormLabel>
        </div>
      </div>
      <div className="container">
        {props.items.map((company) => {
          return (
            <div className="row rounded" key={company._id.toString()}>
              <div className="col rounded" key={company._id.toString()}>
                <CompanyItem
                  key={company._id.toString()}
                  company={company}
                  onSelectCompany={props.onSelectCompany}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CompanyList;
