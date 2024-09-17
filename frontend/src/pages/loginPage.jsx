import { useState } from "react";

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
    <div className="flex flex-col justify-center items-start h-screen text-left bg-black text-white px-6 md:px-20">
      <div className='ml-80 w-4/12'>
        <h1 className="text-3xl md:text-4xl mb-4">Let's get started.</h1>

        <h2 className="text-sm md:text-base font-serif italic opacity-75 mb-6">
          {questions[currentQuestion]}
        </h2>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="w-full max-w-md p-3 text-white border-custom-gray rounded-md text-left input-gradient"
          class='gradient'
          autoFocus
        />

        <div className="flex justify-start mt-4 space-x-2">
          {Array(4)
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
    </div>
  );
};
