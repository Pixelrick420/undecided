import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "./loginPage";
import { SignUpPage } from "./signUpPage";
import { RegisterPage } from "./registrationPage";
import { HostPage } from "./host";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AnimationComponent from "./AnimationComponent";

export const WelcomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentView, setCurrentView] = useState("welcome");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case "login":
        return <LoginPage />;
      case "signup":
        return <SignUpPage />;
      case "host":
        return <HostPage />;
      case "join":
        return <RegisterPage />;
      default:
        return (
          <div className="flex flex-col justify-center items-center h-screen text-center bg-black text-white">
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
            <div className="mt-8">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => setCurrentView("login")}
                    className="mx-4 text-1.5xl h-10 w-36 border-2 border-black rounded-md font-serif bg-gray-800 text-white hover:bg-white hover:text-gray-800 transition-all">
                    Login
                  </button>
                  <button
                    onClick={() => setCurrentView("signup")}
                    className="mx-4 text-1.5xl h-10 w-36 border-2 border-gray-800 rounded-md font-serif bg-black text-white hover:bg-white hover:text-black transition-all">
                    SignUp
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentView("host")}
                    className="mx-4 text-1.5xl h-10 w-36 border-2 border-black rounded-md font-serif bg-gray-800 text-white hover:bg-white hover:text-gray-800 transition-all">
                    Host
                  </button>
                  <button
                    onClick={() => setCurrentView("join")}
                    className="mx-4 text-1.5xl h-10 w-36 border-2 border-gray-800 rounded-md font-serif bg-black text-white hover:bg-white hover:text-black transition-all">
                    Join
                  </button>
                </>
              )}
            </div>
          </div>
        );
    }
  };

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <AnimationComponent />
      </div>
    );
  }

  return renderView();
};
