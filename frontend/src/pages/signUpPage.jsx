export const SignUpPage = () => {
    const customGray = "#252525";
  
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-black text-white">
        <div
          style={{ backgroundColor: customGray }}
          className="w-full h-8 absolute top-0 p-1">
          <p className="text-left ml-5 text-base font-serif">shameer</p>
        </div>
        <h1 className="text-4xl leading-tight mb-4">
          Join Us
          <br />
          <span className="opacity-50 inline-block">Create your account</span>
        </h1>
        <div className="mt-4 w-full max-w-xs">
          <input
            type="text"
            placeholder="Email"
            className="w-full mb-2 p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-2 p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
          />
          <button
            style={{ backgroundColor: customGray }}
            className="w-full p-2 text-2xl border-2 border-black rounded-md">
            Sign Up
          </button>
        </div>
        <div className="mt-6">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
        </div>
      </div>
    );
  };
  