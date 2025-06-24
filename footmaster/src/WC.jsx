import { useState } from "react";

export function WC() {
  const [diff, setDiff] = useState(false);
  const [mode, setMode] = useState("");
  const [ans, setAns] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState([]);

  const answers = ["Argentina", "Brazil" , "Uruguay", "Germany", "Italy", "Spain" ,"England" , "France"];
  // years array but might replace it with a hash map (key - year , value - Country won)
  const years = [1930,1934,1938,1950,1954,1958,1962,1966,1970,1974,1978,1982,1986,1990, 1994 , 1998, 2002,2006,2010,2014,2018,2022];

  function handleGuess() {
    const trimmedAns = ans.trim();
    if (answers.includes(trimmedAns) && !correctGuesses.includes(trimmedAns)) {
      setCorrectGuesses([...correctGuesses, trimmedAns]);
    }
    setAns("");
  }

  return (
    <>
      {!diff ? (
        <>
          <h1>Select difficulty</h1>
          <button onClick={() => { setMode("Easy"); setDiff(true); }}>Easy</button>
          <button onClick={() => { setMode("Hard"); setDiff(true); }}>Hard</button>
        </>
      ) : mode === "Easy" ? (
        <div>
          <p>Guessed: {correctGuesses.length}/{answers.length}</p>
          <input
            placeholder="Enter country name"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
          <button className="submit" onClick={handleGuess}>Enter</button>
        </div>
      ) : (
        <div>
          <p>Hard test</p>
        </div>
      )}
    </>
  );
}
