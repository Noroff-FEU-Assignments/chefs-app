import HeadingPage from "../../components/layout/HeadingPage.js";
import HeadTitle from "../../components/layout/HeadTitle.js";
import { api } from "../../constants/api.js";
import RecipeLink from "./RecipeLink.js";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";



function Recipes() {
  HeadTitle("Recipes | Chef's App")

  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function getRecipes() {
      try {
        const response = await fetch(api + "/recipes")

        if(response.ok) {
          const results = await response.json();
          // console.log(results);
          setRecipe(results.data);
          // console.log(results.data);
        }

      } catch(error) {
        console.log(error)

      } finally {
        setLoading(false);
      }
    }
    getRecipes();
  }, [])

  console.log(recipe[0])


  if(loading) {
    return <Spinner animation="grow" />
  };
  
{/* <h3 key={id}>{attributes.Name}</h3> */}
  return (
    <>
      <HeadingPage>Recipes</HeadingPage>

      <div id="recipeListContainer">
        {recipe.map( (recipeInfo) => {
          const {id, attributes} = recipeInfo
          return (
            <RecipeLink key={id} name={attributes.Name}/>
          )
        })}
      </div>
      
    </>
  )
}

export default Recipes
