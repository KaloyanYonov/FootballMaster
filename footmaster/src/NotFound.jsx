import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  function navigation(){
    navigate('/')
  }

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="grid">
      <h1 className="text-slate-700 font-semibold flex items-center justify-center p-5">Oops! Looks like you've entered a non-existed URL.</h1>
      <button className="flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition focus:outline-none focus:ring focus:ring-emerald-400"
        onClick={navigation}>Go to the home page</button>
        </div>
      </main>
    </>
  );
}
