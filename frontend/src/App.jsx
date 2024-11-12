import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage.jsx";
import { LoginPage } from "./pages/loginPage.jsx";
import { SignUpPage } from "./pages/signUpPage.jsx";
import { ResetPasswordPage } from "./pages/resetPasswordPage.jsx";
import { RegisterPage } from "./pages/registrationPage.jsx";
import "./index.css";
import AnimationComponent from "./pages/AnimationComponent.jsx";
import { Link } from "react-router-dom";
import { HostPage } from "./pages/host.jsx";
import ViewPage from "./pages/viewPage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/a" element={<AnimationComponent />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </div>
  );
}

export default App;
