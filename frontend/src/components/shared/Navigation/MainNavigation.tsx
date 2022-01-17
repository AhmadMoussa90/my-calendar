import { Button } from "@mui/material";
import React from "react";

import MainHeader from "./MainHeader";

import classes from "./MainNavigation.module.css";

const MainNavigation: React.FC<{ username?: String }> = (props) => {
  const RightSide = (
    <div className={`row h-100 ${classes.mainNavigationTitle}`}>
      <div className={`col`}>
        <h1>Mobile.Club</h1>
      </div>
    </div>
  );

  const CenterSide = props.username ? (
    <div className={`row h-100 ${classes.mainNavigationTitle}`}>
      <div className={`col d-flex`}>
        <h2>{props.username}</h2>
      </div>
    </div>
  ) : null;

  const LeftSide = props.username ? (
    <div className={`row h-100 ${classes.mainNavigationTitle}`}>
      <div className="col d-flex justify-content-center">
        <Button> LogOut </Button>
      </div>
    </div>
  ) : (
    <div className={`row h-100 ${classes.mainNavigationTitle}`}>
      <div className={`col ${classes.mainNavigationTitle}`}>
        <h2>Unloged</h2>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <MainHeader>
            <div className="row h-100 w-100">
              <div className="col-6">{RightSide}</div>
              <div className="col-3">{CenterSide}</div>
              <div className="col-3">{LeftSide}</div>
            </div>
          </MainHeader>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainNavigation;
