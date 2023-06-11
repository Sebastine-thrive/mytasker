import React, { useState, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import UserPage from "./pages/user/UserPage";

import "./App.css";
import SignUpPage from "./pages/signup/SignUpPage";
import SignInPage from "./pages/signin/SignInPage";

// interface ProtectedRouteProps {
//   isLoggedIn: boolean | null;
//   children: ReactNode ;
// }

const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(null);
  const [counter, setCounter] = useState<number>(1);

  //Protectd Routes

  // const ProtectedRoute: React.FC<ProtectedRouteProps> =({ isLoggedIn, children }) => {
  //   if (!isLoggedIn) {
  //     return <Navigate to="/signin" replace />;
  //   }
  //   return children;
  //  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/signup"
            element={<SignUpPage userId={userId} setUserId={setUserId} />}
          />

          <Route
            path="/signin"
            element={<SignInPage setisLoggedIn={setisLoggedIn} />}
          />

          <Route path="/user" element={<UserPage />} />

          {/* <Route
            path="/userpage"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>{<UserPage />}</ProtectedRoute>
            }
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
