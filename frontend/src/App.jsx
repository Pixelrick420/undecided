import "./App.css";
import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;
