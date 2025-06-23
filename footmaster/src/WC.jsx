import { useState } from "react";

export function WC() {
  const [diff, setDiff] = useState(false);
  const [mode, setMode] = useState("");

  return (
    <>
      {!diff ? (<> <h1>Select difficulty</h1>
          <button onClick={() => { setMode("Easy"); setDiff(true);}}>Easy</button>
          <button onClick={() => {setMode("Hard");setDiff(true);}}>Hard</button>
        </>
      ) : (
        <p>This is a test</p>
      )}
    </>
  );
}
