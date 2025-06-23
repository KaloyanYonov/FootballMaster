


export function About() {
  return (
    <>
      <h1>
        Welcome to football master! This site allows you to challenge yourself
        on 3 different topics:
      </h1>
      <div className="topics">
        <h3 className="quizType">Champions League winners</h3>
        <h3 classname="quizType">World Cup winners</h3>
        <h3 classname="quizType">Ballon D'or winners</h3>
      </div>

      <div className="rules">
        <h1>The quizes have 2 different types of difficulty:</h1>
        <div className="easyRules">
          <h2 className="easy">Easy</h2>
          <p>
            When on easy difficulty you only need to write down the name of the
            winner, regardless of the year they've won it{" "}
          </p>
          <p>
            Please note that the name of the player/nation/club must begin with
            a capitalized letter and if it is a player you need to write the
            last name
          </p>
          <p>
            For example: <strong>Ronaldo</strong> is a valid answer but{" "}
            <strong>
              <u>messi</u>
            </strong>{" "}
            is not.
          </p>
        </div>
        <div classname="hardRules">
          <h2 className="Hard">Hard</h2>
          <p>
            When on hard difficulty a randomized year will pop-up on your
            screen.You have to write the correct name of the winner
          </p>
          <p>
            For example: Let's assume that we are playing the World Cup quiz and
            the year 1994 pops-up. If you write: <strong>Argentina</strong>,
            that would be invalid, even though Argentina have won the World Cup.
          </p>
        </div>
      </div>
      <h1>Have fun!</h1>
    </>
  );
}
