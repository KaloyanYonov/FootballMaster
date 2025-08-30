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

  const playerPic = {
    Messi: "https://i.eurosport.com/2023/10/30/3815800-77567929-640-480.jpg",
    "Ronaldo Nazario":
      "https://www.thesun.co.uk/wp-content/uploads/2017/12/nintchdbpict000002464455.jpg?strip=all&w=811",
    "Cristiano Ronaldo":
      "https://s.france24.com/media/display/dead63f0-fcab-11e8-8829-005056a964fe/w:1280/p:3x4/football-ballon-or-cristiano-ronaldo-leo-messi-neymar.jpg",
    Suarez:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/LuisSuarezMiramontes1960.webp/640px-LuisSuarezMiramontes1960.webp.png",
    Zidane:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNmiEpe1VjXTvoO8vT9GiLFO0UC0Zdb5x29Q&s",
    Kaka: "https://cdn.resfu.com/media/img_news/kaka-posa-sonriente-con-su-balon-de-oro--twitter.jpg?size=1000x&lossy=1",
    Ronaldinho:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SRIJ7Q8ioJP2Ipv6Qmg7x_EyZs4-MaLJCg&s",
    Cannavaro: "https://pbs.twimg.com/media/FimBjYAWAAUqs9V.jpg",
    Nedved:
      "https://i2-prod.mirror.co.uk/incoming/article27863782.ece/ALTERNATES/s1200b/0_CZECH-SOCCER-PLAYER-PAVEL-NEDVED-POSES-WITH-GOLDEN-BALL-TROPHY.jpg",
    Owen: "https://www.thesun.co.uk/wp-content/uploads/2023/11/b21d9905-ba66-4998-90ea-35f081a2816e.jpg?strip=all&w=891",
    Stoichkov:
      "https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_1:1,f_auto,q_auto,g_auto/shape/cover/sport/SOCCER-BULGARIA-STOICHKOV-GOLDEN-BALL-585bb14100a3879e410f22c2f1dc09e3.jpg",
    "Van Basten":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRbYFGopjo6zubizI979SFR0lRmCexQjD4ww&s",
    Cruyff:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1V_nIhWLjQZN6srb3TpQUZ3h0yh7ktR2UYg&s",
    Benzema:
      "https://static01.nyt.com/images/2022/11/17/multimedia/17soccer-newtrophy-1-2798/17soccer-newtrophy-1-2798-mediumSquareAt3X.jpg",
    Rodri:
      "https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F1028%2Fr1407290_1296x729_16%2D9.jpg",
    Modric:
      "https://assets.laliga.com/assets/2020/01/27/large/a0a5d21df104113811lukamodricbalondeoro.jpeg",
    Yashin: "https://pbs.twimg.com/media/GJJMp9AWEAArVIF.jpg",
    Figo: "https://pbs.twimg.com/media/GBtHL1cWcAASj0l.jpg:large",
    Rivaldo: "https://pbs.twimg.com/media/F9sK0DHXEAEEhF1.jpg",
    Weah: "https://pbs.twimg.com/media/Fd9JzOTWQAAjR4C?format=jpg&name=4096x4096",
    Papin:
      "https://i.pinimg.com/474x/13/bf/79/13bf7987d4414bf17c4a827b6de08337.jpg",
    Belanov:
      "https://www.lequipe.fr/_medias/img-photo-jpg/pour-igor-belanov-le-ballon-d-or-est-synonyme-de-joie-et-d-espoir-grace-a-lui-je-vois-des-etincelles/1500000001788447/0:0,1998:2664-1008-1344-75/b7e4f.jpg",
    Sammer:
      "https://m.media-amazon.com/images/M/MV5BMGU4MzgxYTktZWVlZi00YmQwLWI2ZDQtODNhNTlkYmUyNmY1XkEyXkFqcGc@._V1_.jpg",
    Rossi:
      "https://i.pinimg.com/474x/b8/cb/b6/b8cbb67f5ceeaa45e59eff797ff0dabb.jpg",
    Blokhin: "https://unn.ua/img/2024/12/30/1735567584-4175-large.webp",
    Albert: "https://pbs.twimg.com/media/FfSP6eYWQAElmhC.jpg:large",
    Law: "https://images.squarespace-cdn.com/content/v1/5a9b13955ffd20a2c8d82286/440518c4-4c65-410f-8b3f-f92764add872/DenisLaw1964.jpg",
    Masopust:
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Josef_Masopust_official_photo.jpg",
    Sivori: "https://www.bitbol.co/files/image/45/45195/62f710ead8f55.jpg",
    Matthews:
      "https://footballwriters-co-uk5.s3.eu-west-1.amazonaws.com/wp-content/uploads/2000/05/01140331/22d2f0_d34dcfe32e1d41b2ab08e7254192ee45_mv2.webp",
    Simonsen: "https://pbs.twimg.com/media/DHNm6bDW0AAXY7a.jpg",
    Best: "https://staticg.sportskeeda.com/editor/2021/07/6ffe6-16262638375750-800.jpg",
    Shevchenko:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYSH7p0t_EddbEUwColM2wgRLAkkU27hNAoQ&s",
    Baggio: "https://pbs.twimg.com/media/GCWYM9xWkAI26jF.jpg:large",
    Matthaus:
      "https://i.redd.it/10-3-1991-lothar-matthaus-shows-off-his-ballon-dor-to-the-v0-k0bkt4uipwne1.jpg?width=828&format=pjpg&auto=webp&s=62b403415b4f62480e1d510e8fe9da138db08fac",
    Gullit:
      "https://i.pinimg.com/736x/85/4b/fd/854bfdff0e8586822792bc6edd387b2b.jpg",
    Rivera:
      "https://external-preview.redd.it/YQ4nqwQ2nmHQS09wFtcqR8srXU_Fbmvbpfl4O-lSdSg.jpg?auto=webp&s=f53ad7c6f4c67ccf153c326cf78b65889246a197",
    Kopa: "https://pbs.twimg.com/media/Fe681-5XkAAI46I?format=jpg&name=4096x4096",
    Charlton:
      "https://thehexblog.com/wp-content/uploads/2023/10/041f846da4abe542a8e9b3870785e440.jpg",
    Eusebio:
      "https://i.pinimg.com/474x/ce/30/e3/ce30e37e3b23bfdffad7f44aefa5d9b4.jpg",
    Rummenigge: "https://pbs.twimg.com/media/Dm541zjXoAM_Lvx.jpg",
    Keegan:
      "https://www.planetsport.com/image-library/land/1200/k/kevin-keegan-ballon-dor-may79.webp",
    "Di Stefano":
      "https://sportslens.com/wp-content/uploads/2023/10/Di-Stefano-555x431.jpeg",
    Beckenbauer:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6KcOvfqb4X6O3m4gjIorQBeRb4upPiNgMA&s",
    Platini:
      "https://i.namu.wiki/i/o_99SrLUe0AbNuZq4Z2HMC1jov6pNYnttBIaxy5V7Zpsu2V8o8sJDE-NO0NkZ3manZ9J2MRYtF_tqCdvUGSJuQ.webp",
    Muller:
      "https://www.lequipe.fr/_medias/img-photo-jpg/muller-ballon-d-or-1970-l-equipe/1500000001530444/0:0,1992:1328-828-552-75/4aea3.jpg",
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
          src="https://www.kindpng.com/picc/m/92-925569_ballon-d-or-trophy-png-transparent-png.png"
          alt=""
          className="max-w-[100%] max-h-[80%] object-contain opacity-30 grayscale mix-blend-multiply select-none"
          loading="lazy"
        />
      </div>
      <section className="w-full max-w-xl rounded-2xl p-6 shadow-lg">
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
              Congratulations! You named all Ballon d'Or winners!
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
          <ul className={`mt-3 grid grid-cols-9 gap-3 mb-10 `}>
              {answers.map((name) => {
                const url = playerPic[name];
                const guessed = isGuessed(name);
                return (
                  <li
                    key={name}
                    className="w-full flex flex-col items-center text-center"
                  >
                    <img
                      src={url}
                      alt={`${name} crest`}
                      className={`size-20 object-cover p-2 bg-white rounded-md shadow-sm transition-opacity duration-200 ${
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
          </>
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
