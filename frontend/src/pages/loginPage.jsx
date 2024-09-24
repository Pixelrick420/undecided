import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import AnimationComponent from "./AnimationComponent";

export const LoginPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false); // New state

  const steps = ["Enter your email", "Enter your password"];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (currentStep === 0) setEmail(value);
    if (currentStep === 1) setPassword(value);
  };

  const handleKeyPress = (e) => {
    setError("");
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (currentStep < 1) {
        handleNextStep();
      } else {
        handleLogin();
      }
    } else if (e.key === "ArrowRight") {
      handleNextStep();
    } else if (e.key === "ArrowLeft") {
      handlePreviousStep();
    }
  };

  const handleNextStep = () => {
    if (inputValue.trim() !== "" || currentStep === 0) {
      setInputValue("");
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setInputValue("");
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastLogin: new Date(),
        },
        { merge: true }
      );

      setIsLoggedIn(true);
      resetForm();
    } catch (error) {
      setError(getErrorMessage(error));
      setCurrentStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-disabled":
        return "This user has been disabled.";
      default:
        return "Failed to log in. Please try again.";
    }
  };

  const resetForm = () => {
    setInputValue("");
    setCurrentStep(0);
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className={`flex flex-row w-full justify-center items-center h-screen ${
        isLoggedIn ? "text-center" : "text-left"
      } bg-black text-white px-6 md:px-20`}
    >
      <div className="w-5/12 flex flex-col">
        <h1 className="text-3xl md:text-4xl mb-4">
          {isLoggedIn ? (
            animationComplete ? (
              "Logged In!"
            ) : (
              <AnimationComponent finalText="Logged In!" />
            )
          ) : (
            "Welcome back!"
          )}
        </h1>

        {isLoggedIn ? (
          <>
            {!animationComplete && (
              <AnimationComponent
                finalText="Logged In!"
                onAnimationComplete={() => setAnimationComplete(true)}
              />
            )}
            {animationComplete && (
              <h2 className="text-sm md:text-base font-sans italic opacity-75 mb-6">
                Let's get back into the action.
              </h2>
            )}
          </>
        ) : (
          <>
            <h2 className="text-sm md:text-base font-sans italic opacity-75 mb-6">
              {steps[currentStep]}
            </h2>
            <input
              type={currentStep === 1 ? "password" : "text"}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className={`${error ? "errorgradient" : "gradient"} mb-2`}
              autoFocus
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-row justify-between">
              <div className="flex justify-start mt-4 space-x-2">
                {Array(steps.length)
                  .fill(0)
                  .map((_, index) => (
                    <span
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === currentStep ? "bg-white" : "bg-gray-500"
                      }`}
                    />
                  ))}
              </div>
              {currentStep === 1 && (
                <div className="space-x-1">
                  <span className="text-xs font-sans italic md:text-sm text-gray-400 mt-2">
                    Forgot your password?
                  </span>
                  <Link
                    to="/reset-password"
                    className="text-xs italic md:text-sm text-gray-400 underline cursor-pointer mt-2 font-sans"
                  >
                    Reset it.
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
