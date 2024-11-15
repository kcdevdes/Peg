import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./page/Index/Index";
import Loading from "./page/Loading/Loading";
import Question from "./page/Question/Question";
import Feedback from "./page/Feedback/Feedback";
import TempQuestionResult from "./page/Question/TempQuestionResult";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/loading" element={<Loading />} />
              <Route path="/question" element={<Question />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/tempquestionresult" element={<TempQuestionResult />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
