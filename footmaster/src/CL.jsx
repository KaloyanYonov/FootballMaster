import { useState } from "react";
import {
  getRandomYear,
  handleEasyGuess,
  handleHardGuess,
} from "../src/logic/functions";

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
    "Barcelona",
    "Real Madrid",
    "Celtic",
    "Bayern Munich",
    "Chelsea",
    "Manchester City",
    "Manchester United",
    "Aston Villa",
    "Nottingham Forest",
    "Liverpool",
    "Inter",
    "Milan",
    "Juventus",
    "Borussia Dortmund",
    "Ajax",
    "PSV",
    "Feyenoord",
    "Benfica",
    "Porto",
    "Hamburger",
    "Steaua",
    "Red Star",
    "PSG",
    "Marseille",
  ];

  const hardMode = {
    1956: "Real Madrid",
    1957: "Real Madrid",
    1958: "Real Madrid",
    1959: "Real Madrid",
    1960: "Real Madrid",
    1961: "Benfica",
    1962: "Benfica",
    1963: "Milan",
    1964: "Inter",
    1965: "Inter",
    1966: "Real Madrid",
    1967: "Celtic",
    1968: "Manchester United",
    1969: "Milan",
    1970: "Feyenoord",
    1971: "Ajax",
    1972: "Ajax",
    1973: "Ajax",
    1974: "Bayern Munich",
    1975: "Bayern Munich",
    1976: "Bayern Munich",
    1977: "Liverpool",
    1978: "Liverpool",
    1979: "Nottingham Forest",
    1980: "Nottingham Forest",
    1981: "Liverpool",
    1982: "Aston Villa",
    1983: "Hamburg",
    1984: "Liverpool",
    1985: "Juventus",
    1986: "Steaua",
    1987: "Porto",
    1988: "PSV",
    1989: "Milan",
    1990: "Milan",
    1991: "Red Star",
    1992: "Barcelona",
    1993: "Marseille",
    1994: "Milan",
    1995: "Ajax",
    1996: "Juventus",
    1997: "Borussia Dortmund",
    1998: "Real Madrid",
    1999: "Manchester United",
    2000: "Real Madrid",
    2001: "Bayern Munich",
    2002: "Real Madrid",
    2003: "Milan",
    2004: "Porto",
    2005: "Liverpool",
    2006: "Barcelona",
    2007: "Milan",
    2008: "Manchester United",
    2009: "Barcelona",
    2010: "Inter",
    2011: "Barcelona",
    2012: "Chelsea",
    2013: "Bayern Munich",
    2014: "Real Madrid",
    2015: "Barcelona",
    2016: "Real Madrid",
    2017: "Real Madrid",
    2018: "Real Madrid",
    2019: "Liverpool",
    2020: "Bayern Munich",
    2021: "Chelsea",
    2022: "Real Madrid",
    2023: "Manchester City",
    2024: "Real Madrid",
    2025: "PSG",
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
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-emerald-100 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <img
          src="https://i.pinimg.com/736x/02/82/80/0282805dcfe401855ad998b80e95a549.jpg"
          alt=""
          className="max-w-[100%] max-h-[80%] object-contain opacity-30 grayscale mix-blend-multiply select-none"
          loading="lazy"
        />
      </div>
      <section className="w-full max-w-xl rounded-2xl bg-white/90 backdrop-blur p-6 shadow-lg">
        {!diff ? (
          <>
            <h1 className="text-2xl font-semibold text-slate-900 text-center">
              Select difficulty
            </h1>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition focus:outline-none focus:ring focus:ring-emerald-400"
                onClick={() => {
                  setMode("Easy");
                  setDiff(true);
                }}
              >
                Easy
              </button>
              <button
                className="px-5 py-3 rounded-xl bg-red-800 text-white hover:bg-red-700 transition focus:outline-none focus:ring focus:ring-sky-400"
                onClick={() => {
                  setMode("Hard");
                  setDiff(true);
                  startHardMode();
                }}
              >
                Hard
              </button>
            </div>
          </>
        ) : gameOver ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-rose-700">Game Over!</h2>
            {mode === "Easy" ? (
              <>
                <p className="mt-3 text-slate-700">You missed these teams:</p>
                <ul className="mt-2 list-disc list-inside text-slate-800 text-left">
                  {answers
                    .filter((a) => !correctGuesses.includes(a))
                    .map((missed, i) => (
                      <li key={i}>{missed}</li>
                    ))}
                </ul>
              </>
            ) : (
              <p className="mt-3 text-slate-700">
                The correct answer for <strong>{currentYear}</strong> was:{" "}
                <strong>
                  {currentYear != null ? hardMode[currentYear] : ""}
                </strong>
              </p>
            )}
            <button
              className="mt-6 w-full px-5 py-3 rounded-xl border border-slate-300 bg-white hover:shadow transition focus:outline-none focus:ring focus:ring-slate-300"
              onClick={restartGame}
            >
              Restart
            </button>
          </div>
        ) : showEndMessage ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-emerald-700">
              🎉 Congratulations! You named all Champions League winners!
            </h2>
            <button
              className="mt-6 w-full px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition focus:outline-none focus:ring focus:ring-emerald-400"
              onClick={restartGame}
            >
              Play Again
            </button>
          </div>
        ) : mode === "Easy" ? (
          <div>
            <div className="flex items-center justify-between text-sm text-slate-700">
              <p className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                Lives left: <span className="font-medium">{lives}</span>
              </p>
              <p>
                Guessed:{" "}
                <span className="font-medium">{correctGuesses.length}</span>/
                {answers.length}
              </p>
            </div>

            <input
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring focus:ring-sky-400"
              placeholder="Enter club name"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGuess();
                }
              }}
            />
            <button
              className="mt-3 w-full px-5 py-3 rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition focus:outline-none focus:ring focus:ring-sky-400"
              onClick={handleGuess}
            >
              Enter
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-sm text-slate-700">
              <p className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                Lives left: <span className="font-medium">{lives}</span>
              </p>
              <p>
                Who won the Champions League in{" "}
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-medium">
                  {currentYear}
                </span>
                ?
              </p>
            </div>

            <input
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring focus:ring-emerald-400"
              placeholder="Enter club name"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGuess();
                }
              }}
            />

            <button
              className="mt-3 w-full px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition focus:outline-none focus:ring focus:ring-emerald-400"
              onClick={handleGuess}
            >
              Submit
            </button>

            {feedback && (
              <p className="mt-3 text-sm text-slate-700" aria-live="polite">
                {feedback}
              </p>
            )}

            {feedback && lives > 0 && (
              <button
                className="mt-3 w-full px-5 py-3 rounded-xl border border-slate-300 bg-white hover:shadow transition focus:outline-none focus:ring focus:ring-slate-300"
                onClick={nextQuestion}
              >
                Next Year
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
