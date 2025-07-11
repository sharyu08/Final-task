import { Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
}

export default App;
