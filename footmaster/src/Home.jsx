import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("Easy")

  function navigation(category) {
    navigate(`/${mode}/${category}`);
  }

  return (
    <>
      <h1 className="welcomeMessage">Welcome to Football Master!</h1>
      <h3 className="lowerSpan">
        Choose your mode and test your football knowledge:
      </h3>

      <label htmlFor="mode-select">Select mode:</label>
      <select id="mode-select" value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="Easy">Easy</option>
        <option value="Hard">Hard</option>
      </select>

      <div>
        <button className="navButton" onClick={() => navigation("CLWinners")}>
          Champions League Winners
        </button>
        <button className="navButton" onClick={() => navigation("WCWinners")}>
          World Cup Winners
        </button>
        <button className="navButton" onClick={() => navigation("BDWinners")}>
          Ballon D'or Winners
        </button>
      </div>
    </>
  );
}
