import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage.jsx";
import { LoginPage } from "./pages/loginPage.jsx";
import { SignUpPage } from "./pages/signUpPage.jsx";
import { ResetPasswordPage } from "./pages/resetPasswordPage.jsx";
import "./index.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
