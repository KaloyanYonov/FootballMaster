import { useState } from "react";
import {
  getRandomYear,
  handleEasyGuess,
  handleHardGuess,
} from "../src/logic/functions";

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
    "Argentina",
    "Brazil",
    "Uruguay",
    "Germany",
    "Italy",
    "Spain",
    "England",
    "France",
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
    2022: "Argentina",
  };

  const logoByCountry = {
    Argentina:"https://upload.wikimedia.org/wikipedia/en/1/1e/Asociaci%C3%B3n_del_F%C3%BAtbol_Argentino_%28crest%29.svg",
    Germany:"https://upload.wikimedia.org/wikipedia/mai/c/c8/Germany_National_Football_Team_Logo.png",
    Uruguay:"https://upload.wikimedia.org/wikipedia/ru/4/43/Uruguay_national_football_team_seal.svg",
    Spain:"https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Spain_national_football_team_crest.svg/1200px-Spain_national_football_team_crest.svg.png",
    France:"https://logodownload.org/wp-content/uploads/2022/07/france-national-football-team-logo.png",
    Italy:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_Italy_National_Football_Team_-_2023.svg/250px-Logo_Italy_National_Football_Team_-_2023.svg.png",
    England:"https://previews.123rf.com/images/stas11/stas111805/stas11180500013/102007456-logo-of-the-england-national-football-team.jpg",
    Brazil:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Brazilian_Football_Confederation_logo.svg/1200px-Brazilian_Football_Confederation_logo.svg.png",
  };

  const guessedSet = new Set(correctGuesses.map((g) => g.toLowerCase()));
  const isGuessed = (name) => guessedSet.has(name.toLowerCase());

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
        if (updatedGuesses.length === answers.length) setShowEndMessage(true);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives === 0) setGameOver(true);
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <img
          src="https://i.pinimg.com/736x/2f/68/a4/2f68a434ce88bcd2ed81e276528efb36.jpg"
          alt=""
          className="max-w-[100%] max-h-[80%] object-contain opacity-30 grayscale mix-blend-multiply select-none"
          loading="lazy"
        />
      </div>
      
      <section className="w-full max-w-xl rounded-2xl bg-white/90 backdrop-blur p-6">
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
                <p className="mt-3 text-slate-700">
                  You missed these countries:
                </p>
                <ul className="mt-2 list-disc list-inside text-slate-800 text-left">
                  {answers
                    .filter((c) => !correctGuesses.includes(c))
                    .map((missed, i) => (
                      <li key={i}>{missed}</li>
                    ))}
                </ul>
              </>
            ) : (
              <p className="mt-3 text-slate-700">
                The correct answer for <strong>{currentYear}</strong> was:{" "}
                <strong>{hardMode[currentYear]}</strong>
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
              Congratulations! You named all World Cup winners!
            </h2>
            <button
              className="mt-6 w-full px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition focus:outline-none focus:ring focus:ring-emerald-400"
              onClick={restartGame}
            >
              Play Again
            </button>
          </div>
        ) : mode === "Easy" ? (
          <>
          
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
                placeholder="Enter country name"
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
              <ul className="mt-10 grid grid-cols-2 gap-3 mb-3">
            {answers.map((name) => {
              const url = logoByCountry[name];
              const guessed = isGuessed(name);
              return (
                <li key={name} className="flex flex-col items-center text-center">
                  <img
                    src={url}
                    alt={`${name} crest`}
                    className={`h-15 w-15 object-contain transition-opacity duration-200 ${
                      guessed ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                  />
                  <span
                    className={`mt-1 text-[15px] ${
                      guessed ? "text-slate-700" : "text-transparent"
                    }`}
                  >
                    {name}
                  </span>
                </li>
              );
            })}
          </ul>
            </div>
          </>
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
