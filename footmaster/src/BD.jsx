import { useState } from "react";
import {
  handleEasyGuess,
  handleHardGuess,
  getRandomYear,
} from "./logic/functions";

export function BD() {
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
    "Messi",
    "Ronaldo Nazario",
    "Cristiano Ronaldo",
    "Suarez",
    "Zidane",
    "Kaka",
    "Ronaldinho",
    "Cannavaro",
    "Nedved",
    "Owen",
    "Stoichkov",
    "Van Basten",
    "Cruyff",
    "Benzema",
    "Rodri",
    "Modric",
    "Yashin",
    "Figo",
    "Rivaldo",
    "Weah",
    "Papin",
    "Belanov",
    "Sammer",
    "Rossi",
    "Blokhin",
    "Albert",
    "Law",
    "Masopust",
    "Sivori",
    "Matthews",
    "Simonsen",
    "Best",
    "Shevchenko",
    "Baggio",
    "Matthaus",
    "Gullit",
    "Rivera",
    "Kopa",
    "Charlton",
    "Eusebio",
    "Rummenigge",
    "Keegan",
    "Di Stefano",
    "Beckenbauer",
    "Platini",
    "Muller",
  ];

  const hardMode = {
    1956: "Matthews",
    1957: "Di Stefano",
    1958: "Kopa",
    1959: "Di Stefano",
    1960: "Suarez",
    1961: "Sivori",
    1962: "Masopust",
    1963: "Yashin",
    1964: "Law",
    1965: "Eusebio",
    1966: "Charlton",
    1967: "Albert",
    1968: "Best",
    1969: "Rivera",
    1970: "Muller",
    1971: "Cruyff",
    1972: "Beckenbauer",
    1973: "Cruyff",
    1974: "Cruyff",
    1975: "Blokhin",
    1976: "Beckenbauer",
    1977: "Simonsen",
    1978: "Keegan",
    1979: "Keegan",
    1980: "Rummenigge",
    1981: "Rummenigge",
    1982: "Rossi",
    1983: "Platini",
    1984: "Platini",
    1985: "Platini",
    1986: "Belanov",
    1987: "Gullit",
    1988: "Van Basten",
    1989: "Van Basten",
    1990: "Matthaus",
    1991: "Papin",
    1992: "Van Basten",
    1993: "Baggio",
    1994: "Stoichkov",
    1995: "Weah",
    1996: "Sammer",
    1997: "Ronaldo Nazario",
    1998: "Zidane",
    1999: "Rivaldo",
    2000: "Figo",
    2001: "Owen",
    2002: "Ronaldo Nazario",
    2003: "Nedved",
    2004: "Shevchenko",
    2005: "Ronaldinho",
    2006: "Cannavaro",
    2007: "Kaka",
    2008: "Cristiano Ronaldo",
    2009: "Messi",
    2010: "Messi",
    2011: "Messi",
    2012: "Messi",
    2013: "Ronaldo",
    2014: "Ronaldo",
    2015: "Messi",
    2016: "Ronaldo",
    2017: "Ronaldo",
    2018: "Modric",
    2019: "Messi",
    2021: "Messi",
    2022: "Benzema",
    2023: "Messi",
    2024: "Rodri",
  };
  function startHardMode() {
    setCurrentYear(getRandomYear(hardMode));
    setFeedback("");
  }

  function handleGuess() {
    if (mode === "Easy") {
      const { isNewCorrect, updatedGuesses } = handleEasyGuess(
        ans,
        correctGuesses,
        answers
      );

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
      const { isCorrect, correctAnswer } = handleHardGuess(
        ans,
        currentYear,
        hardMode
      );

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
          <button
            onClick={() => {
              setMode("Easy");
              setDiff(true);
            }}
          >
            Easy
          </button>
          <button
            onClick={() => {
              setMode("Hard");
              setDiff(true);
              startHardMode();
            }}
          >
            Hard
          </button>
        </>
      ) : gameOver ? (
        <div>
          <h2>Game Over!</h2>
          {mode === "Easy" ? (
            <>
              <p>You missed these teams:</p>
              <ul>
                {answers
                  .filter((a) => !correctGuesses.includes(a))
                  .map((missed, i) => (
                    <li key={i}>{missed}</li>
                  ))}
              </ul>
            </>
          ) : (
            <p>
              The correct answer for {currentYear} was: {hardMode[currentYear]}
            </p>
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
          <p>
            Guessed: {correctGuesses.length}/{answers.length}
          </p>
          <input
            placeholder="Enter player name"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
          <button onClick={handleGuess}>Enter</button>
        </div>
      ) : (
        <div>
          <p>Lives left: {lives}</p>
          <p>
            Who won the Ballon D'or League in <strong>{currentYear}</strong>?
          </p>
          <input
            placeholder="Enter player name"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
          <button onClick={handleGuess}>Submit</button>
          {feedback && <p>{feedback}</p>}
          {feedback && lives > 0 && (
            <button onClick={nextQuestion}>Next Year</button>
          )}
        </div>
      )}
    </>
  );
}
