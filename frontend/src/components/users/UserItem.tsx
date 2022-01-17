import { FormControlLabel, Radio } from "@mui/material";

import { User } from "../../models";

const UserItem: React.FC<{
  user: User;
  onSelectUser: (_id: String) => void;
}> = (props) => {
  return (
    <FormControlLabel
      value={props.user.name}
      control={<Radio />}
      label={props.user.name as string}
      onClick={() => props.onSelectUser(props.user._id)}
    />
  );
};

export default UserItem;
