import React from "react";

export const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl font-serif mb-6">Welcome, Adil Haneef!</h1>
        <p className="text-lg mb-8">What would you like to do?</p>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-white text-md font-serif">
            <span className="text-purple-400 mr-2">•</span>
            Register
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-white text-md font-serif">
            <span className="text-yellow-400 mr-2">•</span>
            Host
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-white text-md font-serif">
            <span className="text-purple-400 mr-2">•</span>
            Check
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-white text-md font-serif">
            <span className="text-yellow-400 mr-2">•</span>
            View
          </button>
        </div>
      </div>
    </div>
  );
};
