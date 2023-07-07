import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  screen,
} from "@testing-library/react";
// import SignUp from "./SignUp"
import SignUp, { User } from "./SignUp";

// import SignUpPage from "../../pages/signup/SignUpPage";

describe("<SignUp />", () => {
  test("should display a blank login form, with a button", async () => {});
});

// test("Username input should be rendered", () => {
//     render(<SignUp />);
//   const usernameInput = screen.getByPlaceholderText(/username/i);
//   expect(usernameInput).toBeInTheDocument();
// });


// test("Username input placeholder should be rendered", () => {
//   //   render<React.FC>(<SignUp />);
//   render<React.FC<User>>(<SignUp />);

//   const usernameInput = screen.getByPlaceholderText(
//     /username/i
//   ) as HTMLInputElement;
//   expect(usernameInput).toBeInTheDocument();
// });


test("Username input should be rendered", () => {
//   const { container }: RenderResult = render(<SignUp />);
  const usernameInput = screen.getByPlaceholderText(
    /username/i
  ) as HTMLInputElement;
  expect(usernameInput).toBeInTheDocument();
});