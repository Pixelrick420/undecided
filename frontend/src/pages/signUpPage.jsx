import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import AnimationComponent from "./AnimationComponent";

export const SignUpPage = () => {
  const questions = ["What's your name?", "Enter your email", "Set a password"];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (currentQuestion === 0) {
      setName(value);
    } else if (currentQuestion === 1) {
      setEmail(value);
      if (!/\S+@\S+\.\S+/.test(value)) {
        setError("Please enter a valid email address.");
      } else {
        setError("");
      }
    } else if (currentQuestion === 2) {
      setPassword(value);
      if (value.length < 6) {
        setError("Password must be at least 6 characters long.");
      } else {
        setError("");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (currentQuestion < 2) {
        handleNextQuestion();
      } else {
        handleSignUp();
      }
    } else if (e.key === "ArrowRight") {
      handleNextQuestion();
    } else if (e.key === "ArrowLeft") {
      handlePreviousQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (inputValue.trim() !== "" || currentQuestion === 0) {
      setInputValue("");
      setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleSignUp = async () => {
    if (error) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setError("");
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      setShowAnimation(true);
      resetForm();
    } catch (err) {
      let errorMessage = "An error occurred. Please try again.";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Your password is too weak.";
          break;
        default:
          console.log(err);
          errorMessage = "Something went wrong, please try again.";
      }

      setError(errorMessage);
    }
  };

  const resetForm = () => {
    setInputValue("");
    setCurrentQuestion(0);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-row w-full justify-center items-center h-screen text-left bg-black text-white px-6 md:px-20">
      {showAnimation ? (
        <AnimationComponent finalText="Signup successful!" redirect="/" />
      ) : (
        <div className="w-5/12 flex flex-col">
          <h1 className="text-3xl md:text-4xl mb-4">Let's get started.</h1>
          <h2 className="text-sm md:text-base font-sans italic opacity-75 mb-6">
            {questions[currentQuestion]}
          </h2>
          <input
            type={currentQuestion === 2 ? "password" : "text"}
            value={
              currentQuestion === 0
                ? name
                : currentQuestion === 1
                ? email
                : password
            }
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className={`${!error ? "gradient" : "errorgradient"} mb-2`}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex justify-start mt-4 space-x-2">
            {Array(questions.length)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentQuestion ? "bg-white" : "bg-gray-500"
                  }`}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
