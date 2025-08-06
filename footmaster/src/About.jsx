


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
              Please note that for the Ballon D'or quiz you must only write the last name (except if 2 different players with the same name have won it).
              For the Champions League quiz - some of the teams must be written in their entirety.
              <p>For example : "Manchester United" or "Bayern Munich."</p>
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
