import HeadingPage from "../../components/layout/HeadingPage.jsx";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import RecipeLink from "./RecipeLink.jsx";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";



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
        console.log(error)

      } finally {
        setLoading(false);
      }
    }
    getRecipes();
  }, [url])

  // console.log(recipes)



  if(loading) {
    return <Spinner animation="grow" />
  };

  const searchItems = (searchValue) => {
    setSearch(searchValue)

    if (search !== "") {
      const filteredData = recipes.filter( (recipe) => {      
      return Object.values(recipe.attributes.Name).join("").toLowerCase().includes(search.toLowerCase());
      })
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
      <div className="search-sort">
        <input onChange={(e) => searchItems(e.target.value)} type="text" id="searchRecipe" className="search-input" placeholder="Search recipe" />
        <select>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>
      <div id="recipeListContainer">
        {search.length >= 1 ? (
          filteredRecipes.map( (recipeInfo) => {
            const {id, attributes} = recipeInfo
            return (
            <RecipeLink key={id} id={id} name={attributes.Name}/>
          )  
          }) 
          ) : (
              recipes.map( (recipeInfo) => {
                const {id, attributes} = recipeInfo
                return (
                  <RecipeLink key={id} id={id} name={attributes.Name}/>
                )
              })
            
            )
      } 

        {/* {recipes.map( (recipeInfo) => {
          const {id, attributes} = recipeInfo
          return (
            <RecipeLink key={id} id={id} name={attributes.Name}/>
          )
        })} */}
      </div>
      
    </>
  )
  
  
}

// const [search, setSearch] = useState("");

// function FilterRecipes(event) {
//   setSearch(event.target.value);

//   console.log(search);

//   // const searchForm = document.querySelector("#searchRecipe");
//   // const test = document.querySelector("h1");

//   // test.onClick = () => {
//   //   console.log("done")
//   // }

//   // searchForm.onChange = (event) => {
//   //   console.log(event.target.value);
//   // }
// }




export default Recipes
