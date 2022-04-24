import HeadingPage from "../../components/layout/HeadingPage.js";
import HeadTitle from "../../components/layout/HeadTitle.js";
import { api } from "../../constants/api.js";
// import RecipeLink from "./RecipeLink.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { marked } from "marked";


function RecipeDetails() {
  HeadTitle("Details | Chef's App")

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
  
  console.log(details);
  if (loading) {
    return <Spinner animation="grow" />
  }

  const getMarkdownText = (text) => {
    const formattedText = marked(text);
    return { __html: formattedText };
  };

  return (
    <>
    <HeadingPage>{details.Name}</HeadingPage>
    <div id="recipeContainer">
      <div id="ingredients">
        <h2>Ingredients</h2>
        <div dangerouslySetInnerHTML={getMarkdownText(details.Ingredients)}></div>
      </div>
      <div className="separator"></div>
      <div id="instructions">
        <h2>Instructions</h2>
        <div dangerouslySetInnerHTML={getMarkdownText(details.Instructions)}></div>
      </div>
    </div>
    </>
  )
}

export default RecipeDetails
