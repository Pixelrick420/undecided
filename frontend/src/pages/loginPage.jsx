export const LoginPage = () => {
  const customGray = "#252525";

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
