import React from "react";
import { ButtonProps } from "../../../types/ButtonProps";
import "./button.css"

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color,
  backgroundColor,
}) => {
  return (
    <button
      className="button"
      onClick={onClick}
      style={{ backgroundColor, color }}
    >
      {text}
    </button>
  );
};

export default Button;
