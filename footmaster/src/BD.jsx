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
    2013: "Cristiano Ronaldo",
    2014: "Cristiano Ronaldo",
    2015: "Messi",
    2016: "Cristiano Ronaldo",
    2017: "Cristiano Ronaldo",
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
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-emerald-100 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <img
          src="https://www.kindpng.com/picc/m/92-925569_ballon-d-or-trophy-png-transparent-png.png"
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
                className="px-5 py-3 rounded-xl bg-red-800 text-white hover:bg-red-700 transition focus:outline-none focus:ring focus:ring-red-400"
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
                <p className="mt-3 text-slate-700">You missed these players:</p>
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
              🎉 Congratulations! You named all Ballon d'Or winners!
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
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
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
              placeholder="Enter player name"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter"){
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
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
                Lives left: <span className="font-medium">{lives}</span>
              </p>
              <p>
                Who won the Ballon d&apos;Or in{" "}
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-medium">
                  {currentYear}
                </span>
                ?
              </p>
            </div>

            <input
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring focus:ring-emerald-400"
              placeholder="Enter player name"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter"){
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
