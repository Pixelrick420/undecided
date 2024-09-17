import { useState } from "react";

const customGray = '#252525';

export const LoginPage = () => {
  const questions = [
    "Enter your email",
    "Enter password password",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== "") {
      handleNextQuestion();
    } else if (e.key === 'ArrowRight') {
      handleNextQuestion();
    } else if (e.key === 'ArrowLeft') {
      handlePreviousQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (inputValue.trim() !== "" || currentQuestion === 0) {
      setInputValue(""); 
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-black text-white">
      <div
        style={{ backgroundColor: customGray }}
        className="w-full h-8 absolute top-0 p-1"
      >
        <p className="text-left ml-5 text-base font-serif">shameer</p>
      </div>
      <h1 className="text-4xl leading-tight mb-4">
        Welcome Back
        <br />
        <span className="opacity-50 inline-block">Login to continue</span>
      </h1>
      <div className="mt-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Email"
          className="w-full mb-2 p-2 bg-gray-800 text-white border border-gray-700 rounded-md outline-none focus:bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-800 text-white border border-gray-700 rounded-md outline-none focus:bg-gray-700"
        />
        <button
          style={{ backgroundColor: customGray }}
          className="w-full p-2 mb-2 text-2xl border-2 border-black rounded-md"
        >
          Login
        </button>
        <p className="text-xs italic opacity-50">
          <a href="#" className="underline">
            Forgot Password?
          </a>
        </p>
      </div>
      <div className="mt-6">
        <p className="text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
