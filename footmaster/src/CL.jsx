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
    1983: "Hamburger",
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

   const logoByClub = {
    "Real Madrid" : "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/640px-Real_Madrid_CF.svg.png",
    "Barcelona" : "https://upload.wikimedia.org/wikipedia/sco/thumb/4/47/FC_Barcelona_%28crest%29.svg/2020px-FC_Barcelona_%28crest%29.svg.png",
    "Manchester City": "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    "Manchester United" : "https://upload.wikimedia.org/wikipedia/sco/thumb/7/7a/Manchester_United_FC_crest.svg/2021px-Manchester_United_FC_crest.svg.png",
    "Ajax" : "https://upload.wikimedia.org/wikipedia/sco/thumb/7/79/Ajax_Amsterdam.svg/1017px-Ajax_Amsterdam.svg.png",
    "PSG" : "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/640px-Paris_Saint-Germain_F.C..svg.png" ,
    "Bayern Munich" : "https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg" ,
    "Borussia Dortmund": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png" ,
    "Liverpool" : "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" ,
    "Chelsea" : "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png" ,
    "Nottingham Forest" : "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Nottingham_Forest_F.C._logo.svg/1200px-Nottingham_Forest_F.C._logo.svg.png",
    "Aston Villa" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrIbm_0tHQs_haHnk8i7XWqonIYUlaIpbt5g&s",
    "Inter" : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Inter_Old_Logo_%282007-2014%29.svg/1491px-Inter_Old_Logo_%282007-2014%29.svg.png",
    "Milan" : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/250px-Logo_of_AC_Milan.svg.png" ,
    "Juventus" : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png",
    "PSV" : "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/PSV_Eindhoven.svg/1200px-PSV_Eindhoven.svg.png", 
    "Feyenoord" : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Feyenoord_logo_since_2024.svg/1200px-Feyenoord_logo_since_2024.svg.png",
    "Benfica" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwJ0o5cMqZXdFW8v8LTnZbEciVyT85LH04g&s",
    "Porto" : "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/FC_Porto.svg/1200px-FC_Porto.svg.png",
    "Red Star" : "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Red_Star_Belgrade_crest.svg/800px-Red_Star_Belgrade_crest.svg.png",
    "Marseille" : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/1200px-Olympique_Marseille_logo.svg.png",
    "Hamburger" : "https://upload.wikimedia.org/wikipedia/commons/f/f7/Hamburger_SV_logo.svg",
    "Steaua" : "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Steaua_Bucure%C8%99ti.svg/1200px-Steaua_Bucure%C8%99ti.svg.png",
    "Celtic" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0GtnyKFGARgNxdmjcQ5LhgE_hPbAzVxTqg&s"

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
              Congratulations! You named all Champions League winners!
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
             <ul className="mt-10 grid grid-cols-6 gap-3 mb-3">
            {answers.map((name) => {
              const url = logoByClub[name];
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
