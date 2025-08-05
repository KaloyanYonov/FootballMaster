export function getRandomYear(hardMode) {
  const years = Object.keys(hardMode);
  const randIndex = Math.floor(Math.random() * years.length);
  return parseInt(years[randIndex], 10);
}

export function handleEasyGuess(input, correctGuesses, answers) {
  const trimmed = input.trim();
  const isNewCorrect = answers.includes(trimmed) && !correctGuesses.includes(trimmed);
  return {
    isNewCorrect,
    updatedGuesses: isNewCorrect ? [...correctGuesses, trimmed] : correctGuesses,
  };
}

export function handleHardGuess(input, currentYear, hardMode) {
  const trimmed = input.trim().toLowerCase();
  const correct = String(hardMode[currentYear] || "").toLowerCase();
  const isCorrect = trimmed === correct;
  return {
    isCorrect,
    correctAnswer: hardMode[currentYear],
  };
}
