import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="start-container">
      <div className="start-box">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
          alt="FocusFlow Logo"
          className="start-logo"
        />
        <h1>Todo-App <span>FocusFlow</span></h1>
        <p>Organize your day. Conquer your tasks. Stay in flow. ✨</p>
        <button className="start-button" onClick={() => navigate("/dashboard")}>
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}

export default StartPage;
