import classes from "./MainHeader.module.css";

const MainHeader: React.FC<{}> = (props) => {
  return <header className={classes.mainHeader}>{props.children}</header>;
};

export default MainHeader;
