import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function ReturnToMain({ inGame = false }) {
  const navigate = useNavigate();

  function ReturnToMain() {
    if (inGame) {
      const ok = window.confirm(
        "Do you want to return to the main page? Your progress will be lost."
      );
      if (!ok) return;
    }
    navigate("/");
  }

  return (
    <button
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-slate-700 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      onClick={ReturnToMain}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
      <span className="sr-only">Back</span>
    </button>
  );
}
