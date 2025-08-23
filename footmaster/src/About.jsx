export function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-emerald-100 flex items-center justify-center p-4">
      <section className="w-full max-w-3xl rounded-2xl bg-white/90 backdrop-blur p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900 text-center">
          Welcome to Football Master!
        </h1>
        <p className="mt-2 text-center text-slate-600">
          This site lets you challenge yourself on three topics:
        </p>



        {/* need to fix these next time*/}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <h3 className="font-semibold text-slate-900">Champions League winners</h3>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <h3 className="font-semibold text-slate-900">World Cup winners</h3>
          </div>
          <div className="items-center  justify-between rounded-xl border border-slate-200 bg-white p-4 text-center"> 
            <h3 className="font-semibold text-slate-900">Ballon d'Or winners</h3>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900 text-center">
            The quizzes have two difficulty modes
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="text-lg font-semibold text-slate-900">Easy</h3>
              </div>
              <p className="mt-3 text-slate-700">
                Type the name of a correct winner-year doesn't matter.
              </p>
              <ul className="mt-3 list-disc list-inside text-slate-700 space-y-1">
                <li>
                  <span className="font-medium">Ballon d'Or:</span> enter the player's last name
                  (unless two winners share the same last name).
                </li>
                <li>
                  <span className="font-medium">Champions League:</span> some clubs must be written fully.
                  For example: <em>Manchester United</em>, <em>Bayern Munich</em>.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                <h3 className="text-lg font-semibold text-slate-900">Hard</h3>
              </div>
              <p className="mt-3 text-slate-700">
                A random year appears. Type the winner for that specific year.
              </p>
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-slate-700">
                <p className="text-sm">
                  Example (World Cup): if the year is <strong>1994</strong> and you type {" "}
                  <strong>Argentina</strong>, it's wrong—even though Argentina are World Cup winners—
                  because they didn't win in 1994.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-lg font-semibold text-emerald-700">
          Have fun!
        </p>
      </section>
    </main>
  );
}
