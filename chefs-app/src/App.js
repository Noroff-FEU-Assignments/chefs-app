import Navigation from "./components/layout/Navigation.js";
import { BrowserRouter as Router, Routes, Route, NAvLink } from "react-router-dom";
import "./sass/style.scss";

function App() {
  return (
    <>
      <Router>
        <Navigation />
      </Router>
    </>
  );
}

export default App;
