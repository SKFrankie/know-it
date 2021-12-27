import React from 'react'
import Button from "../ui/Button";
import * as ga from "../lib/ga";

const GaButton = ({label="Button", children, onClick, ...props}) => {
  const GaEvent = () => {
    ga.event({
      action: label,
    });
    onClick && onClick();
  };
  return (
    <Button onClick={GaEvent} {...props}>
      {children}
    </Button>
  )
}

export default GaButton
