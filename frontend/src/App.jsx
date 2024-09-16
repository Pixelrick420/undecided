import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage.jsx";
import { LoginPage } from "./pages/loginPage.jsx";
import "./index.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
