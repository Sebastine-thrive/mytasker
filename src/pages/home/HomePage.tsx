import React from "react";
import Header from "./header/Header";
import { Link } from "react-router-dom";
import bgImage from "./../../assets/images/game_lady.jpg";
import "./homepage.css";
import Button from "../../components/commons/button/Button";

export default function HomePage() {
  return (
    <div className="home">
      <Header />
      <div className="body">
        <div className="intro">
          <h1>
            <span> Create your tasks, </span> <br />
            <span> manage them, </span> <br />
            <span> achieve your goals.</span>
          </h1>

          <div className="links">
            <div className="home-sign-up">
            <Link to="/signup">
              <Button
                onClick={() => null}
                text="SIGN UP"
                color="white"
                backgroundColor="var(--primaryBlue)"
              />
            </Link>
            </div>

            <Link to="/signin">
              <p className="sign_in">SIGN IN</p>
            </Link>
          </div>
        </div>

        <div className="intro-image">
          <img
            src={bgImage}
            alt=" lady playing golf"
            width="400px"
            height="400px"
          />
        </div>
      </div>
    </div>
  );
}