import { Avatar, Chip } from "@mui/material";

import { Company } from "../../models";

const CompanyItem: React.FC<{
  company: Company;
  onSelectCompany: (_id: String) => void;
}> = (props) => {
  return (
    <div className="row p-2">
      <div className="col">
        <Chip
          key={props.company._id.toString()}
          avatar={
            <Avatar
              alt={props.company.name.toString()}
              src="public/uploads/images/avatar/xxxx.jpg"
            />
          }
          label={props.company.name.toString()}
          onClick={() => props.onSelectCompany(props.company._id)}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default CompanyItem;
