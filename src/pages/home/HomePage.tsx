import React from "react";
import Header from "./header/Header";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import taskImage from "./../../assets/images/golf.png";
import "./homepage.css";
import Button from "../../components/commons/button/Button";

export default function HomePage() {
  return (
    <div className="home">
      <Header />
      <div className="body">
        <div className="intro">
          <motion.h1
            initial={{ x: 50, opacity: 0.7 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 3 }}
          >
            <span> Create your tasks,</span> <br />
            <span> manage them,</span> <br />
            <span> achieve your goals.</span>
          </motion.h1>

          <motion.div
            className="links"
            initial={{ x: 100, opacity: 0.7 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 4 }}
          >
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
          </motion.div>
        </div>

        <div className="intro-image">
          <img
            src={taskImage}
            alt=" lady playing golf"
            width="600px"
            height="420px"
          />
        </div>
      </div>
    </div>
  );
}
