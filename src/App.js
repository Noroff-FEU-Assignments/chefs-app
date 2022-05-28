import Navigation from "./components/layout/Navigation.jsx";
import Footer from "./components/layout/Footer.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Announcements from "./pages/announcements/Announcements.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Inventory from "./pages/inventory/Inventory.jsx";
import EditRecipe from "./pages/editRecipe/EditRecipe.jsx";
import { AuthProvider } from "./utilities/AuthContext.jsx";
import Login from "./pages/login/Login.jsx";
import LoginForm from "./pages/login/LoginForm.jsx";
import Messages from "./pages/messages/Messages.jsx";
import NewInventoryItem from "./pages/newInventoryItem/NewInventoryItem.jsx";
import NewRecipe from "./pages/newRecipe/NewRecipe.jsx";
import RecipeDetails from "./pages/recipeDetails/RecipeDetails.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./sass/style.scss";
import ProtectedRoute from "./utilities/ProtectedRoute.jsx";


function App() {  

  return (
    <>
    {/* <PriceContextProvider> */}
    <AuthProvider>
      <Router>
        <Navigation />
        <Container>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/recipes/details/:id" element={<RecipeDetails />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/write-announcement" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/add-inventory-item" element={<ProtectedRoute><NewInventoryItem /></ProtectedRoute>} />
              <Route path="/add-recipe" element={<ProtectedRoute><NewRecipe /></ProtectedRoute>} />
              <Route path="/recipes/details/:id/edit-recipe/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
            </Routes>
          </Container>
        <Footer />
      </Router>
    </AuthProvider>  
    {/* </PriceContextProvider> */}
    </>
  );
}

export default App;
