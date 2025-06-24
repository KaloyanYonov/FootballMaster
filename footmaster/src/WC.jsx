import { useState } from "react";

export function WC() {
  const [diff, setDiff] = useState(false);
  const [mode, setMode] = useState("");
  const [ans, setAns] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentYear, setCurrentYear] = useState(null);
  const [showEndMessage, setShowEndMessage] = useState(false);

  const answers = [
    "Argentina", "Brazil", "Uruguay", "Germany",
    "Italy", "Spain", "England", "France"
  ];

  const hardMode = {
    1930: "Uruguay",
    1934: "Italy",
    1938: "Italy",
    1950: "Uruguay",
    1954: "Germany",
    1958: "Brazil",
    1962: "Brazil",
    1966: "England",
    1970: "Brazil",
    1974: "Germany",
    1978: "Argentina",
    1982: "Italy",
    1986: "Argentina",
    1990: "Germany",
    1994: "Brazil",
    1998: "France",
    2002: "Brazil",
    2006: "Italy",
    2010: "Spain",
    2014: "Germany",
    2018: "France",
    2022: "Argentina"
  };

  function getRandomYear() {
    const years = Object.keys(hardMode);
    const randIndex = Math.floor(Math.random() * years.length);
    return parseInt(years[randIndex]);
  }

  function startHardMode() {
    const newYear = getRandomYear();
    setCurrentYear(newYear);
    setFeedback("");
  }

  function handleGuess() {
    const trimmedAns = ans.trim();

    if (mode === "Easy") {
      if (answers.includes(trimmedAns) && !correctGuesses.includes(trimmedAns)) {
        const updated = [...correctGuesses, trimmedAns];
        setCorrectGuesses(updated);
        if (updated.length === answers.length) {
          setShowEndMessage(true);
        }
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives === 0) {
          setGameOver(true);
        }
      }
    } else if (mode === "Hard") {
      if (trimmedAns.toLowerCase() === hardMode[currentYear].toLowerCase()) {
        setFeedback(`Correct! ${currentYear} was won by ${hardMode[currentYear]}.`);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        setFeedback(`Wrong! The correct answer was ${hardMode[currentYear]}.`);
        if (newLives === 0) {
          setGameOver(true);
        }
      }
    }

    setAns("");
  }

  function nextQuestion() {
    startHardMode();
    setFeedback("");
  }

  function restartGame() {
    setDiff(false);
    setMode("");
    setAns("");
    setCorrectGuesses([]);
    setLives(3);
    setGameOver(false);
    setFeedback("");
    setCurrentYear(null);
    setShowEndMessage(false);
  }

  return (
    <>
      {!diff ? (
        <>
          <h1>Select difficulty</h1>
          <button onClick={() => { setMode("Easy"); setDiff(true); }}>Easy</button>
          <button onClick={() => { setMode("Hard"); setDiff(true); startHardMode(); }}>Hard</button>
        </>
      ) : gameOver ? (
        <div>
          <h2>Game Over!</h2>
          {mode === "Easy" ? (
            <>
              <p>You missed these countries:</p>
              <ul>
                {answers.filter(a => !correctGuesses.includes(a)).map((missed, i) => (
                  <li key={i}>{missed}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>The correct answer for {currentYear} was: {hardMode[currentYear]}</p>
          )}
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : showEndMessage ? (
        <div>
          <h2>🎉 Congratulations! You named all World Cup winners!</h2>
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : mode === "Easy" ? (
        <div>
          <p>Lives left: {lives}</p>
          <p>Guessed: {correctGuesses.length}/{answers.length}</p>
          <input
            placeholder="Enter country name"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
          <button onClick={handleGuess}>Enter</button>
        </div>
      ) : (
        <div>
          <p>Lives left: {lives}</p>
          <p>Who won the World Cup in <strong>{currentYear}</strong>?</p>
          <input
            placeholder="Enter country name"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
          <button onClick={handleGuess}>Submit</button>
          {feedback && <p>{feedback}</p>}
          {feedback && lives > 0 && <button onClick={nextQuestion}>Next Year</button>}
        </div>
      )}
    </>
  );
}
