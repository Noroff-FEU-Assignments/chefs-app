import Navigation from "./components/layout/Navigation.js";
import Footer from "./components/layout/Footer.js";
import { BrowserRouter as Router } from "react-router-dom";
import "./sass/style.scss";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Footer />
      </Router>
    </>
  );
}

export default App;
