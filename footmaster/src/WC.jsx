import { useState } from "react";
import { getRandomYear, handleEasyGuess, handleHardGuess } from "../src/logic/functions";

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
    1930: "Uruguay", 1934: "Italy", 1938: "Italy", 1950: "Uruguay",
    1954: "Germany", 1958: "Brazil", 1962: "Brazil", 1966: "England",
    1970: "Brazil", 1974: "Germany", 1978: "Argentina", 1982: "Italy",
    1986: "Argentina", 1990: "Germany", 1994: "Brazil", 1998: "France",
    2002: "Brazil", 2006: "Italy", 2010: "Spain", 2014: "Germany",
    2018: "France", 2022: "Argentina"
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
        if (updatedGuesses.length === answers.length) setShowEndMessage(true);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives === 0) setGameOver(true);
      }
    } else if (mode === "Hard") {
      const { isCorrect, correctAnswer } = handleHardGuess(ans, currentYear, hardMode);
      if (isCorrect) {
        setFeedback(`Correct! ${currentYear} was won by ${correctAnswer}.`);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        setFeedback(`Wrong! The correct answer was ${correctAnswer}.`);
        if (newLives === 0) setGameOver(true);
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
      <section className="w-full max-w-xl rounded-2xl bg-white/90 backdrop-blur p-6">
        {!diff ? (
          <>
            <h1 className="text-2xl font-semibold text-slate-900 text-center">Select difficulty</h1>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition focus:outline-none focus:ring focus:ring-emerald-400"
                onClick={() => { setMode("Easy"); setDiff(true); }}
              >
                Easy
              </button>
              <button
                className="px-5 py-3 rounded-xl bg-red-800 text-white hover:bg-red-700 transition focus:outline-none focus:ring focus:ring-sky-400"
                onClick={() => { setMode("Hard"); setDiff(true); startHardMode(); }}
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
                <p className="mt-3 text-slate-700">You missed these countries:</p>
                <ul className="mt-2 list-disc list-inside text-slate-800 text-left">
                  {answers.filter(c => !correctGuesses.includes(c)).map((missed, i) => (
                    <li key={i}>{missed}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-3 text-slate-700">
                The correct answer for <strong>{currentYear}</strong> was: <strong>{hardMode[currentYear]}</strong>
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
            <h2 className="text-2xl font-semibold text-emerald-700">Congratulations! You named all World Cup winners!</h2>
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
                Guessed: <span className="font-medium">{correctGuesses.length}</span>/{answers.length}
              </p>
            </div>

            <input
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring focus:ring-sky-400"
              placeholder="Enter country name"
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
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                Lives left: <span className="font-medium">{lives}</span>
              </p>
              <p>
                Who won the World Cup in{" "}
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-medium">
                  {currentYear}
                </span>
                ?
              </p>
            </div>

            <input
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring focus:ring-emerald-400"
              placeholder="Enter country name"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
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
