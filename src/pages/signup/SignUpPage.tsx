import React, { SetStateAction, Dispatch } from "react";
import SignUp from "../../components/signup/SignUp";
import "./sign-up-page.css";

interface UserIdProps {
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
}

const SignUpPage: React.FC<UserIdProps> = ({ userId, setUserId }) => {
  return (
    <div className="form-container">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
