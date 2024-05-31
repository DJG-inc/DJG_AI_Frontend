import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import RecordForm from "./components/RecordForm";
import ElicitationForm from "./components/ElicitationForm";
import SRSForm from "./components/SrsForm";

function App() {
  return (
    <>
      <header class="py-8 px-4 mx-auto max-w-l lg:py-16 lg:px-8">
        <h1 class="text-4xl font-bold leading-tight text-center text-green-700 lg:text-5xl">
          AI Powered Elicitation Toolset{" "}
          <span class="text-green-500">by DJG</span>
        </h1>
        <p class="mt-2 text-lg text-center text-gray-400">
          An AI powered tool that can generate meeting records, SRS, and find
          the best elicitation technique.
        </p>
      </header>
      <Router>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/generate-record" element={<RecordForm />} />
          <Route path="/get-elicitation-technique" element={<ElicitationForm />} />
          <Route path="/generate-srs" element={<SRSForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
