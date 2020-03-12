import React from "react";

import "../style.css";

const Box = props => {
  let className = "box" + (props.highlight ? " highlight" : "");
  return (
    <div className={className} onClick={props.onClick}>
      {props.value}
    </div>
  );
};

export default Box;
