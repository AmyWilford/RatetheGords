import "./App.css";
import Home from "./components/Home";
import SubmitComplete from "./components/submitComplete";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thankyou" element={<SubmitComplete />} />
      </Routes>
    </Router>
  );
}

export default App;
