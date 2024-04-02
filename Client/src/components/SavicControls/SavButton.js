// Import necessary libraries and components
import React from "react";
import Button from "react-bootstrap/Button";

// Define your ButtonComponent
const SavButton = (props) => {
  return (
    <>
      <Button
        variant={props.variant}
        type="submit"
        onClick={props.onClick}
        className={props.className}
      >
        {props.text}
      </Button>
    </>
  );
};

export default SavButton;
