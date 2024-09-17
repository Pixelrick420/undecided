import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage.jsx";
import { LoginPage } from "./pages/loginPage.jsx";
import { SignUpPage } from "./pages/signUpPage.jsx";
import { AnimationPage } from "./pages/animationPage.jsx";
import { ResetPasswordPage } from "./pages/resetPasswordPage.jsx";
import "./index.css";

import { Link } from "react-router-dom";

function App() {
  const Text = "";
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/animation" element={<AnimationPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
      <Link to={`/animation?text=${encodeURIComponent(Text)}`}></Link>
    </div>
  );
}

export default App;
