import cn from "classnames";
import "./style.css";

function Button(props) {
  return <button {...props} className={cn("cnButton", props.className)} />;
}

export default Button;
