import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold">Welcome to Football Master!</h1>
        <p className="mt-2 text-slate-600">Test your football knowledge</p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => navigate("/about")}
          >
            About
          </button>

          <button
            className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:shadow transition"
            onClick={() => navigate("/CLWinners")}
          >
            Champions League Winners
          </button>
          <button
            className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:shadow transition"
            onClick={() => navigate("/BDWinners")}
          >
            Ballon D'or Winners
          </button>
          <button
            className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:shadow transition"
            onClick={() => navigate("/WCWinners")}
          >
            World Cup winners
          </button>
        </div>
      </div>
    </main>
  );
}
