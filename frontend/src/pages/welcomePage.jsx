import React, { useState, useEffect } from "react";
import { LoginPage } from "./loginPage";
import { SignUpPage } from "./signUpPage";
import { RegisterPage } from "./registrationPage";
import { HostPage } from "./host";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AnimationComponent from "./AnimationComponent";

export const WelcomePage = () => {
  const customGray = "#252525";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [viewSignup, setViewSignup] = useState(false);
  const [viewJoin, setViewJoin] = useState(false);
  const [viewHost, setViewHost] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedPage = localStorage.getItem("viewPage");

    if (!storedPage) {
      setViewLogin(false);
      setViewSignup(false);
      setViewHost(false);
      setViewJoin(false);
    } else {
      if (storedPage === "login") {
        setViewLogin(true);
      } else if (storedPage === "signup") {
        setViewSignup(true);
      } else if (storedPage === "host") {
        setViewHost(true);
      } else if (storedPage === "join") {
        setViewJoin(true);
      }
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem("viewPage");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const savePageState = (page) => {
    localStorage.setItem("viewPage", page);
  };

  if (viewLogin) {
    return <LoginPage />;
  }

  if (viewSignup) {
    return <SignUpPage />;
  }

  if (viewJoin) {
    return <RegisterPage />;
  }

  if (viewHost) {
    return <HostPage />;
  }

  const buttonStyle = {
    transition: "all 0.3s ease",
    color: "white",
    backgroundColor: customGray,
  };

  const hoverStyle = {
    backgroundColor: "white",
    color: customGray,
    borderColor: customGray,
  };

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <AnimationComponent finalText="" redirect={"/"} />
      </div>
    );
  }

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
              onMouseEnter={(e) => {
                Object.assign(e.target.style, hoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, buttonStyle);
              }}
              onClick={() => {
                setViewLogin(true);
                savePageState("login");
              }}
              style={buttonStyle}
              className="mx-4 text-1.5xl h-10 w-36 border-2 border-black rounded-md font-serif">
              Login
            </button>
            <button
              onMouseEnter={(e) => {
                Object.assign(e.target.style, hoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  backgroundColor: "black",
                  color: "white",
                  borderColor: customGray,
                });
              }}
              onClick={() => {
                setViewSignup(true);
                savePageState("signup");
              }}
              className="mx-4 text-1.5xl h-10 w-36 bg-black border-2 rounded-md font-serif">
              SignUp
            </button>
          </>
        ) : (
          <>
            <button
              onMouseEnter={(e) => {
                Object.assign(e.target.style, hoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, buttonStyle);
              }}
              onClick={() => {
                setViewHost(true);
                savePageState("host");
              }}
              style={buttonStyle}
              className="mx-4 text-1.5xl h-10 w-36 border-2 border-black rounded-md font-serif">
              Host
            </button>
            <button
              onMouseEnter={(e) => {
                Object.assign(e.target.style, hoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  backgroundColor: "black",
                  color: "white",
                  borderColor: customGray,
                });
              }}
              onClick={() => {
                setViewJoin(true);
                savePageState("join");
              }}
              className="mx-4 text-1.5xl h-10 w-36 bg-black border-2 rounded-md font-serif">
              Join
            </button>
          </>
        )}
      </div>
    </div>
  );
};
