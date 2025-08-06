import { useState } from "react";
import { getRandomYear, handleEasyGuess, handleHardGuess } from "../src/logic/functions";

export function CL() {
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
    "Barcelona", "Real Madrid", "Celtic", "Bayern Munich", "Chelsea",
    "Manchester City", "Manchester United", "Aston Villa", "Nottingham Forest",
    "Liverpool", "Inter", "Milan", "Juventus", "Borussia Dortmund", "Ajax", "PSV",
    "Feyenoord", "Benfica", "Porto", "Hamburger", "Steaua", "Red Star", "PSG", "Marseille"
  ];

  const hardMode = {
    1956: "Real Madrid", 1957: "Real Madrid", 1958: "Real Madrid", 1959: "Real Madrid", 1960: "Real Madrid",
    1961: "Benfica", 1962: "Benfica", 1963: "Milan", 1964: "Inter", 1965: "Inter", 1966: "Real Madrid",
    1967: "Celtic", 1968: "Manchester United", 1969: "Milan", 1970: "Feyenoord", 1971: "Ajax", 1972: "Ajax",
    1973: "Ajax", 1974: "Bayern Munich", 1975: "Bayern Munich", 1976: "Bayern Munich", 1977: "Liverpool", 1978: "Liverpool",
    1979: "Nottingham Forest", 1980: "Nottingham Forest", 1981: "Liverpool", 1982: "Aston Villa",
    1983: "Hamburger", 1984: "Liverpool", 1985: "Juventus", 1986: "Steaua", 1987: "Porto", 1988: "PSV",
    1989: "Milan", 1990: "Milan", 1991: "Red Star", 1992: "Barcelona", 1993: "Marseille", 1994: "Milan",
    1995: "Ajax", 1996: "Juventus", 1997: "Borussia Dortmund", 1998: "Real Madrid", 1999: "Manchester United",
    2000: "Real Madrid", 2001: "Bayern Munich", 2002: "Real Madrid", 2003: "Milan", 2004: "Porto", 2005: "Liverpool",
    2006: "Barcelona", 2007: "Milan", 2008: "Manchester United", 2009: "Barcelona", 2010: "Inter",
    2011: "Barcelona", 2012: "Chelsea", 2013: "Bayern Munich", 2014: "Real Madrid", 2015: "Barcelona",
    2016: "Real Madrid", 2017: "Real Madrid", 2018: "Real Madrid", 2019: "Liverpool", 2020: "Bayern Munich",
    2021: "Chelsea", 2022: "Real Madrid", 2023: "Manchester City", 2024: "Real Madrid", 2025: "PSG"
  };

  function startHardMode() {
    setCurrentYear(getRandomYear(hardMode));
    setFeedback("");
  }

  function handleGuess() {
    if (mode === "Easy") {
      const { isNewCorrect, updatedGuesses } = handleEasyGuess(ans, correctGuesses, answers);

      if (isNewCorrect) {
        setCorrectGuesses(updatedGuesses);
        if (updatedGuesses.length === answers.length) {
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
      const { isCorrect, correctAnswer } = handleHardGuess(ans, currentYear, hardMode);

      if (isCorrect) {
        setFeedback(`Correct! ${currentYear} was won by ${correctAnswer}.`);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        setFeedback(`Wrong! The correct answer was ${correctAnswer}.`);
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
              <p>You missed these teams:</p>
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
          <h2>🎉 Congratulations! You named all Champions League winners!</h2>
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : mode === "Easy" ? (
        <div>
          <p>Lives left: {lives}</p>
          <p>Guessed: {correctGuesses.length}/{answers.length}</p>
          <input
            placeholder="Enter club name"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
          <button onClick={handleGuess}>Enter</button>
        </div>
      ) : (
        <div>
          <p>Lives left: {lives}</p>
          <p>Who won the Champions League in <strong>{currentYear}</strong>?</p>
          <input
            placeholder="Enter club name"
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
