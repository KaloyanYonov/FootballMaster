import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { CL } from "./CL";
import { BD } from "./BD";
import { WC } from "./WC";
import { About } from "./About";
import { NotFound } from "./NotFound";


function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/WCWinners" element={<WC />} />
            <Route path="/CLWinners" element={<CL />} />
            <Route path="/BDWinners" element={<BD />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
