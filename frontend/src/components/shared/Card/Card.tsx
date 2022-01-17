import classes from "./Card.module.css";

const Card: React.FC<{ className?: String; style?: React.CSSProperties }> = (
  props
) => {
  return (
    <div className="container">
      <div className={`row ${classes.card}`} style={props.style}>
        <div className={`col ${classes.cardContent}`}>{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
