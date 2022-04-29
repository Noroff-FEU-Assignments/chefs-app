import Navigation from "./components/layout/Navigation.jsx";
import Footer from "./components/layout/Footer.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Announcements from "./pages/announcements/Announcements.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Inventory from "./pages/inventory/Inventory.jsx";
import Login from "./pages/login/Login.jsx";
import Messages from "./pages/messages/Messages.jsx";
import NewInventoryItem from "./pages/newInventoryItem/NewInventoryItem.jsx";
import NewRecipe from "./pages/newRecipe/NewRecipe.jsx";
import RecipeDetails from "./pages/recipeDetails/RecipeDetails.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./sass/style.scss";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Container>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/write-announcement" element={<Announcements />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/add-inventory-item" element={<NewInventoryItem />} />
              <Route path="/add-recipe" element={<NewRecipe />} />
              <Route path="/recipes/details/:id" element={<RecipeDetails />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
