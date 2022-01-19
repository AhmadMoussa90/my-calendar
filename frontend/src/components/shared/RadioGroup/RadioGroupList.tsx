import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import RadioGroupItem, { RadioItem } from "./RadioGroupItem";

const RadioGroupList: React.FC<{
  items: RadioItem[];
  title: String;
  onSelectItem: (_id: String) => void;
  onRadioGroupClick?: () => void;
}> = (props) => {
  if (props.items && props.items.length === 0) {
    return <h2>no items</h2>;
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.title}</FormLabel>
      <RadioGroup
        aria-label="group_name"
        defaultValue=""
        name="radio-buttons-group"
        onClick={props.onRadioGroupClick}
      >
        {props.items.map((item) => {
          return (
            <RadioGroupItem
              key={item._id.toString()}
              item={item}
              onSelectItem={props.onSelectItem}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupList;
