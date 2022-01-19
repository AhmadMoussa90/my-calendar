import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { User } from "../../models";
import Card from "../shared/Card/Card";
import RadioGroupList from "../shared/RadioGroup/RadioGroupList";

import classes from "./UserList.module.css";

const UserList: React.FC<{
  items: User[];
  warningMessage: String | null;
  onSelectUser: (_id: String) => void;
  returnBackHandler: () => void;
  logIn: (password: String) => void;
}> = (props) => {
  const [selectedUser, setSelectedUser] = useState<Boolean>(false);
  const [warningMessage, setWarningMessage] = useState<String | null>(null);

  useEffect(() => {
    setWarningMessage(props.warningMessage);
  }, [props.warningMessage]);

  const passwordTextFieldRef = useRef<HTMLInputElement>(null);

  const logInHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedUser) {
      setWarningMessage("Please select user!");
      return;
    }

    const enteredPassword = passwordTextFieldRef.current!.value;
    if (enteredPassword.trim().length === 0) {
      setWarningMessage("Please enter your password!");
      return;
    }

    setWarningMessage(null);
    props.logIn(enteredPassword);
  };

  const textChangeHandler = () => setWarningMessage(null);

  if (!props.items || props.items.length === 0) {
    return (
      <div className="row">
        <div className="col">
          <h1>No Users !</h1>
        </div>
      </div>
    );
  }

  const returnBack = (
    <div className="row">
      <div className="col">
        <Button variant="contained" onClick={props.returnBackHandler}>
          <h3>&larr; Return</h3>
        </Button>
      </div>
    </div>
  );

  const userSelection = (
    <div className={`row ${classes.usersRadioButtons}`}>
      <div className="col">
        <RadioGroupList
          items={props.items}
          title="Who are you ?"
          onSelectItem={props.onSelectUser}
          onRadioGroupClick={() => {
            setSelectedUser(true);
            setWarningMessage(null);
          }}
        />
      </div>
    </div>
  );

  const passwordInput = (
    <div className="row">
      <div className="col">
        <TextField
          className={classes.passwordTextField}
          sx={{ m: 1 }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          inputRef={passwordTextFieldRef}
          onChange={textChangeHandler}
        />
      </div>
    </div>
  );

  const logInButton = (
    <div className="row">
      <div className="col">
        <Button variant="contained" onClick={logInHandler}>
          <h3>LogIn &#8594;</h3>
        </Button>
      </div>
    </div>
  );

  const warningAlert = warningMessage ? (
    <div className="row">
      <div className="col">
        <p className="text-danger">{warningMessage}</p>
      </div>
    </div>
  ) : null;

  return (
    <Card>
      {returnBack}
      {userSelection}
      {passwordInput}
      {logInButton}
      {warningAlert}
    </Card>
  );
};

export default UserList;
