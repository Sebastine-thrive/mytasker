import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/commons/button/Button";
import "./header.css";

function Header() {
  return (
    <div className="container">
      <div className="logo">
        <p>myTasker.</p>
      </div>

      <div className="header-sign-in">
        <Link to="/signin">
          <Button
            onClick={() => null}
            text="SIGN IN"
            color="white"
            backgroundColor="var(--green)"
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
