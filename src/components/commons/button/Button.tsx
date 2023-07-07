import React from "react";
import "./button.css";

type ButtonProps = {
  text: string;
  onClick: () => void;
  color: string;
  backgroundColor: string;
};

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
