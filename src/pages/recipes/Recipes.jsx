import HeadingPage from "../../components/layout/HeadingPage.jsx";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import RecipeLink from "./RecipeLink.jsx";
import { useState, useEffect } from "react";
import Spinner from "../../utilities/Spinner.jsx";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { FaSearch } from "react-icons/fa";



function Recipes() { 
  const url = api + "/recipes";

  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  console.log(filteredRecipes);

  useEffect( () => {
    async function getRecipes() {
      try {
        const response = await fetch(url)

        if(response.ok) {
          const results = await response.json();
          // console.log(results);
          setRecipe(results.data);
        }

      } catch(error) {
        console.log(error);
        <SystemMessage type={"message error"} content={"Something went wrong"} />

      } finally {
        setLoading(false);
      }
    }
    getRecipes();
  }, [url])

  
  if(loading) {
    return <Spinner />
  };


  const searchItems = (searchValue) => {
    setSearch(searchValue);
      const filteredData = recipes.filter( (recipe) => {
      if (recipe.attributes.name.toLowerCase().includes(search)) {
        return true 
        }   
      })
      
      if (search.length > 0) {
        setFilteredRecipes(filteredData);
      } else {
        setFilteredRecipes(recipes)
      }
  }
  

  return (
    <>
      <Helmet>
        <title>Recipes | Chef's App</title>
      </Helmet>
      <HeadingPage>Recipes</HeadingPage>
      <div className="search">
        <input onChange={(e) => searchItems(e.target.value)} type="text" id="searchRecipe" className="search-input" placeholder="Search recipe" />
        <FaSearch className="search-icon" />
      </div>
      <div id="recipeListContainer">
        {search.length >= 1 ? (
          filteredRecipes.map( (recipeInfo) => {
            const {id, attributes} = recipeInfo
            return (
            <RecipeLink key={id} id={id} name={attributes.name}/>
          )  
          }) 
          ) : (
              recipes.map( (recipeInfo) => {
                const {id, attributes} = recipeInfo
                return (
                  <RecipeLink key={id} id={id} name={attributes.name}/>
                )
              })
            
            )
      } 
      </div>
      
    </>
  )
  
  
}

export default Recipes
