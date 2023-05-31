import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUser } from "../features/currentuser/CurrentUser";
import { RootState } from "../../store";
import "./signin.css";

interface ComponentProps {
  setisLoggedIn: (value: boolean | null) => void;
}

interface User {
  id: number | null;
  username: string | null;
  password: string | null | undefined;
}

const SignIn: React.FC<ComponentProps> = ({ setisLoggedIn }) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [signupError, setSignUpError] = useState(false);
  const [enteredUsernameError, setEnteredUsernameError] = useState(false);
  const [enteredPasswordError, setEnteredPasswordError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.UserReducer.users);
  console.log(users);

  // Function to check array of users for a username
  function findUserName(users: User[], username: string): boolean {
    return users.some((user) => user.username === username);
  }

  // Checks if username exists
  const usernameExists = findUserName(users, enteredUsername);

  // Function to check array of users for a password

  function findPassword(users: User[], password: string): boolean {
    return users.some((user) => user.password === password);
  }

  // Checks if the password exists
  const passwordExists = findPassword(users, enteredPassword);
  // console.log(passwordExists);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.classList.add("focused");
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.classList.remove("focused");
    }
  };

  const handleUsernameEntry = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEnteredUsername(event.target.value);
    },
    []
  );

  const handlePasswordEntry = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEnteredPassword(event.target.value);
    },
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (usernameExists && passwordExists) {
      setSignUpError(false);
    }

    if (!usernameExists) {
      setEnteredUsernameError(true);
    }

    if (!passwordExists) {
      setEnteredPasswordError(true);
    }

    // if (enteredUsername === username && enteredPassword !== password)
    if (usernameExists && !passwordExists) {
      setEnteredPasswordError(true);
      setEnteredUsernameError(false);
      setSignUpError(false);
    }

    if (passwordExists && !usernameExists) {
      setEnteredUsernameError(true);
      setEnteredPasswordError(false);
    }

    if (enteredUsername.length === 0 && enteredPassword.length === 0) {
      setSignUpError(true);
      setEnteredUsernameError(false);
      setEnteredPasswordError(false);
    }

    if (usernameExists && passwordExists) {
      setEnteredPasswordError(false);
      setEnteredUsernameError(false);
      setSignUpError(false);
      setisLoggedIn(true);

      const updatedUser = {
        username: enteredUsername,
        password: enteredPassword,
      };

      dispatch(updateCurrentUser(updatedUser));

      navigate("/user");
    }
  };

  return (
    <div className="sign-in-wrapper">
      <h2> Access your account</h2>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          placeholder=" Enter Your Username"
          name="enteredUsername"
          value={enteredUsername}
          type="text"
          className="name"
          onChange={handleUsernameEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <input
          ref={inputRef}
          placeholder=" Enter Your Password"
          type="password"
          name="enteredPassword"
          value={enteredPassword}
          className="password"
          onChange={handlePasswordEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <button> Sign In</button>
      </form>

      {enteredUsernameError && (
        <p className="error entered-username-error">
          The entered username does not match the records.
        </p>
      )}

      {enteredPasswordError && (
        <p className=" error entered-password-error">
          The entered password does not match the records.
        </p>
      )}

      {signupError && (
        <p className="error"> Enter the correct username and password. </p>
      )}

      <p className="sign-up-redirect">
        Don't have an account? Please
        <Link to="/signup"> Sign up </Link>
      </p>
    </div>
  );
};

export default SignIn;
