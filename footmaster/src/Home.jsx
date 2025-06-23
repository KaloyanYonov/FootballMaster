import { useNavigate } from "react-router-dom";


export function Home() {
  const navigate = useNavigate();

  function navigation(category) {
    navigate(`/${category}`);
  }



  return (
    <>
      <h1 className="welcomeMessage">Welcome to Football Master!</h1>
      <h3 className="lowerSpan">
        Test your football knowledge:
      </h3>

      <div>
        <button className="navButton" onClick={() => navigation("about")}>About</button>
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
