import React from "react";
import "./my-button.style.css";

function MyButton(props) {
  return (
    <button type="button" className={`btn btn-secondary my-button`}>
      {props.text}
    </button>
  );
}

export default MyButton;
