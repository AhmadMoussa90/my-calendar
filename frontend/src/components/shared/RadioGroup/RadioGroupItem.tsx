import { FormControlLabel, Radio } from "@mui/material";

export type RadioItem = {
  _id: String;
  name: String;
};

const RadioGroupItem: React.FC<{
  item: RadioItem;
  onSelectItem: (_id: String) => void;
}> = (props) => {
  return (
    <FormControlLabel
      value={props.item.name}
      control={<Radio />}
      label={props.item.name as string}
      onClick={() => props.onSelectItem(props.item._id)}
    />
  );
};

export default RadioGroupItem;
