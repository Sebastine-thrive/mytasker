import React from "react";
import SignIn from "../../components/signin/SignIn";
import "./sign-in-page.css";


interface ComponentProps {
  setisLoggedIn: (value: boolean | null) => void;
 
}

const SignInPage: React.FC<ComponentProps> = ({ setisLoggedIn }) => {
  return (
    <div className="signin-form-container">
      <SignIn 
      setisLoggedIn={setisLoggedIn}
      />
    </div>
  );
}

export default SignInPage;
