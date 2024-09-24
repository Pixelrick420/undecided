import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "./loginPage";
import { SignUpPage } from "./signUpPage";

export const WelcomePage = () => {
  const navigate = useNavigate();
  const customGray = "#252525";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [viewSignup, setViewSignup] = useState(false);

  if (viewLogin) {
    return <LoginPage />;
  }

  if (viewSignup) {
    return <SignUpPage />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-black text-white">
      <div
        style={{ backgroundColor: customGray }}
        className="w-full h-8 absolute top-0 p-1"
      >
        <p className="text-left ml-5 text-base font-serif">shameer</p>
      </div>
      <h1 className="text-4xl leading-tight mb-0">
        Safe, secure and quick registrations.
        <br />
        <span className="opacity-50 inline-block">
          now possible thanks to "hehe"
        </span>
      </h1>
      <p className="italic mt-2 text-xs">
        Take part in all the events you want to,
        <br />
        without having to <span className="underline">worry</span> about
        hundreds of passes.
      </p>
      <div className="mt-4">
        <button
          onClick={() => {
            setViewLogin(true);
          }}
          style={{ backgroundColor: customGray }}
          className="mx-4 text-1.5xl h-10 w-36 border-2 border-black rounded-md font-serif"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="mx-4 text-1.5xl h-10 w-36 bg-black border-2 border-custom-gray rounded-md font-serif"
        >
          SignUp
        </button>
      </div>
    </div>
  );
};
