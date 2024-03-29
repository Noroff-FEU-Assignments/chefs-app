import HeadingRecipePage from "../../components/layout/HeadingRecipeDetails.jsx";
import Spinner from "../../utilities/Spinner.jsx";
import { api } from "../../constants/api.js";
import AuthContext from "../../utilities/AuthContext.jsx";
import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { marked } from "marked";
import { FaTrash, FaPen } from "react-icons/fa";
import axios from "axios";



function RecipeDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useContext(AuthContext)
  const navigate = useNavigate("/")
 
  const {id} = useParams();

  const detailsURL = api + "/recipes/" + id;

  useEffect( () => {
    async function recipe() {
      try {
        const response = await fetch(detailsURL);

        if (response.ok) {
          const results = await response.json();
          setDetails(results.data.attributes);
        }

      } catch(error) {
        console.log(error)

      } finally {
        setLoading(false)
      }
    }
    recipe();
  }, [detailsURL]);

  if (loading) {
    return <Spinner />
  }

  async function deleteRecipe() {
    const confirmDelete = window.confirm("Are you sure you want to delete the recipe?");

    if (confirmDelete) {
      try {
        const deleteResponse = await axios.delete(detailsURL,
          { headers: {
            Authorization: `Bearer ${auth.data.jwt}`,
          }});
        navigate("/recipes");

      } catch(error) {
        console.log(error);
      }
    }
  }

  const getMarkdownText = (text) => {
    const formattedText = marked(text);
    return { __html: formattedText };
  };


  let adminButtons = ""
  if (auth && auth.data.user.email === "admin@admin.com") {
    adminButtons =  <div id="admin-buttons">
                      <Link to={`edit-recipe/${id}`} className="edit-btn">Edit <FaPen/></Link>
                      <button type="button" className="delete-btn" onClick={deleteRecipe}>Delete <FaTrash/></button>
                    </div>
  }


  return (
    <>
    <Helmet>
      <title>{details.name}</title>
    </Helmet>
    <HeadingRecipePage>{details.name}</HeadingRecipePage>
    <div id="recipeContainer">
      <div id="ingredients">
        <h2>Ingredients</h2>
        <div dangerouslySetInnerHTML={getMarkdownText(details.ingredients)}></div>
      </div>
      <div id="instructions">
        <h2>Instructions</h2>
        <div dangerouslySetInnerHTML={getMarkdownText(details.instructions)}></div>
      </div>
    </div>
    {adminButtons}
    </>
  )
}

export default RecipeDetails
