import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { addUser } from "../features/users/UserSlice";

//  CSS file for styling
import "./signup.css";

interface User {
  id: number;
  username: string | null;
  password: string | null;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [counter, setCounter] = useState<number>(1);

  const signUpNotify = () => {
    toast("Nice! You have successfully signed up. Now Sign in");
  };

  function UniqueIdGenerator() {
    const generateUniqueId = (): number => {
      const uniqueId: number = counter;
      setCounter((prevCounter: number) => prevCounter + 1);
      return uniqueId;
    };

    return generateUniqueId;
  }

  const UniqueId = UniqueIdGenerator();
  const users = useSelector((state: RootState) => state.UserReducer.users);

  function findUserName(users: User[], username: string): boolean {
    return users.some((user) => user.username === username);
  }

  const usernameExists = findUserName(users, username);

  const handleUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (usernameExists) {
      return;
    } else {
      setUsername("");
      setPassword("");
      const user = {
        id: UniqueId(),
        username,
        password,
      };
      dispatch(addUser(user));
      signUpNotify();
    }
  };
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

  return (
    <motion.div
      className="sign-up-wrapper"
      initial={{ x: -100, opacity: 0.7 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 2 }}
    >
      <h2> Create your account</h2>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          placeholder="Username"
          name="username"
          type="text"
          className="name"
          value={username}
          onChange={handleUsernameChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <input
          ref={inputRef}
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="password"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <button>Create Account</button>
      </form>

      {usernameExists && (
        <p className="error username-error">
          User already exists. If this is you, signin with your password. If it
          is not you, please change the username.
        </p>
      )}

      <p className="sign-in-redirect">
        Have an account already?
        <Link to="/signin"> Sign in </Link>
      </p>
      <ToastContainer position="top-center" autoClose={3000} />
    </motion.div>
  );
};

export default SignUp;
